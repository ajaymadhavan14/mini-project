var db = require('../config/connection');
var collection = require('../config/collections');
const bcrypt = require('bcrypt');
//const { response } = require('express');
var objectId = require('mongodb').ObjectId

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.insertedId.toString())
            })
             
             
        })
    },
    
    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("login success");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("Login Failed");
                resolve({status:false})
            }
        })
    },

    getAllUsers:()=>{
        return new Promise(async (resolve,reject)=>{
            let users=await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },

    
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            //console.log(userId);
            //console.log(objectId(userId));
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(userId)}).then((response)=>{
                resolve(response)
                
            })
        })

    },

    getUserDetails:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(prodId)}).then((user)=>{
                resolve(user)
            })
        })
    },

    updateUser:(prodId,userDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(prodId)},{
                $set:{
                    Name:userDetails.Name,
                   Email:userDetails.Email
                }
            }).then((response)=>{
                resolve()
            })
        })
    },


    searchUser:(data)=>{
        let qData= new RegExp(data,"i")
        return new Promise(async (resolve,reject)=>{
            let users=await db.get().collection(collection.USER_COLLECTION).find({Name:{$regex:qData}}).toArray()
            resolve(users)
        })
    }




}

