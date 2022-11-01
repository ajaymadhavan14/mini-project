var db = require('../config/connection');
var collection = require('../config/collections');
const { response } = require('../app');
var objectId = require('mongodb').ObjectId

module.exports={

    addProduct:(product,callback)=>{
       // console.log(product);

        db.get().collection('product').insertOne(product).then((data)=>{
           // console.log(data);

             callback(data.insertedId.toString())
        })
            
        
     },
     getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products= await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
     },
     deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            //console.log(prodId);
            //console.log(objectId(prodId));
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(prodId)}).then((response)=>{
                resolve(response)
            })
        })

     },
     getProductDetails:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(prodId)}).then((product)=>{
                resolve(product)
            })
        })

     },
      updateProduct:(prodId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(prodId)},{
                $set:{
                    Name:proDetails.Name,
                    Discription:proDetails.Discription,
                    Price:proDetails.Price,
                    Category:proDetails.Category
                }
            }).then((response)=>{
                resolve()
            })
        })
      }

     }

