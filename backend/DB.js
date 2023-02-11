if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}
const { MongoClient } = require("mongodb");
const bcrypt=require('bcrypt')
const uri = process.env.MONGODB_URI


async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
        return mongoClient;
    } catch (error) {
        console.log(err)
        process.exit();
    }
 }

  async function insertInDB(userInfo){
    let mongoClient
    
    try{
        mongoClient=await connectToCluster(uri)
        const db = mongoClient.db('users');
        const collection = db.collection('registered');

        const loginFetchedData=await collection.findOne({userName:userInfo.userName})

        if(loginFetchedData){
            return {status:false}
        }else{
            const hashedPassword=await bcrypt.hash(userInfo.password, 10);

            hashedPassword && await collection.insertOne({
                userName:userInfo.userName,
                password:hashedPassword,
                name:userInfo.name,
                checkBoxes:userInfo.checkBoxes,
                gender:userInfo.gender
            })
            return null
        }
    }catch(err){
        console.log(err)
    }
    finally{
        await mongoClient.close()
    }
 }

async function getUsers(userInfo){
    let mongoClient
    try{
        mongoClient=await connectToCluster(uri)
        const db = mongoClient.db('users');
        const collection = db.collection('registered');
        const loginFetchedData=await collection.findOne({userName:userInfo.userName})
        if(loginFetchedData){
            return loginFetchedData
        }else return null

    }catch(err){
        console.log(err)
    }
}


 module.exports={insertInDB,getUsers,connectToCluster}