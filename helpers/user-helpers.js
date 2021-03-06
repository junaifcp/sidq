var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
var promise=require("promise")
const async = require('hbs/lib/async')
const res = require('express/lib/response')

module.exports={
    dosignup:(userData)=>{
        return new promise(async(resolve,reject)=>{
        userData.Password= await bcrypt.hash(userData.Password,10)
        db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
            resolve(data)
    
        })
        
    })
    },
    doLogin:(userData)=>{
        return new promise(async(resolve,reject)=>{
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
                      console.log('login failed');
                      resolve({status:false})
                  }


                
                  
              })

          }else{
              console.log('login failed');
              resolve({status:false})
              
          }

        })

        
    }
}