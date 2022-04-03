const { promiseCallback } = require('express-fileupload/lib/utilities');
var db=require('../config/connection')
var collection=require('../config/collections');
const async = require('hbs/lib/async');
const { reject, resolve } = require('promise');
const { ObjectId } = require('mongodb');
var objectId=require('mongodb').ObjectId
module.exports={
    addproduct:(product,callback)=>{
    //  console.log(product);
     db.get().collection('product').insertOne(product).then((data)=>{
      
        callback(data.insertedId)

     })   
    },
    getAllprodducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },

    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).remove({_id:objectId(prodId)}).then((response)=>{
             console.log(response);
                resolve(response)
            }).catch((err)=>{
                console.log("error occured while fetching data");
            })
        })
    }

}