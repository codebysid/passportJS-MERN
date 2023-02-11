const localStrategy=require('passport-local').Strategy
const bcrypt=require('bcrypt')
const passport = require('passport')
const dbOperations=require('./DB')

const customFields={
    usernameField:"userName",
    passwordField:"password"
}


const verifyCallBack=async (username,password,done)=>{
    try{
    const User=await dbOperations.getUsers({userName:username})
    if(User){
         bcrypt.compare(password, User.password, function(err, res) {
            if (res) {
             return done(null,User)
            } else {
             return done(null, false)
            }
          });

    }
    }catch(err){
        return done(err)
    }
}

const strategy=new localStrategy(customFields,verifyCallBack)

passport.use(strategy)

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

