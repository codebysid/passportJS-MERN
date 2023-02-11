if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}
const dbOperations=require('./DB')
const jwt =require('jsonwebtoken')
const express=require('express')
const cors=require('cors')
const { MongoClient } = require("mongodb");
const bcrypt=require('bcrypt')
const passport = require('passport');
const flash=require('express-flash')
const session=require('express-session')

require("./authPassport")


const uri = process.env.MONGODB_URI


const app=express()


app.use(cors())
app.use(express.json())
app.use(flash())
app.use(session({
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize()) 
app.use(passport.session())


app.post('/registration',async(req,res)=>{
    const userInfo=req.body
    const doc=dbOperations.insertInDB(userInfo)

    if(doc && doc.status===false){
        res.send(doc)
    }
})


app.post('/login',passport.authenticate('local',{
    failureRedirect:"loginFailure",
    successRedirect:"loginSuccess"
}
))


app.get('/loginSuccess',(req,res)=>{
    res.send({authenticated:true})
})

app.get('/loginFailure',(req,res)=>{
    res.send({authenticated:false})
})

app.post('/details',async(req,res)=>{
    const loginCred={
        userName:req.body.userName
    }
    try{
        const doc=await dbOperations.getUsers(loginCred)
        if(doc){
            res.send({
                name:doc.name,
                hobbies:doc.checkBoxes,
                gender:doc.gender
        })
        }

    }catch(err){
        console.log(err)
    }

})

app.listen(3030, () => {
    console.log(`Listening on port 3030`)
  })

