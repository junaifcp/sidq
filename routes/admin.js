var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllprodducts().then((products)=>{
    
    
    res.render('admin/view-products',{admin:true,products});

  })
  

 
});
router.get('/add-products', function(req,res){
  res.render('admin/add-products')
})
router.post('/add-products',(req,res)=>{
  // console.log(req.body);
  // console.log(req.files.Image);
  productHelper.addproduct(req.body,(id)=>{
    let image =req.files.Image
    console.log(id)
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-products")

      }else{
        console.log(err);
      }
    })
    

  })
  router.get('/delete-product',(req,res)=>{
    // let proId=req.params.id
    console.log(proId+"productidddd");
    res.send("response")

  //   productHelpers.deleteProduct(proId).then((response)=>{
  //     res.redirect('/admin/')
  //   })

  // })
  
})

module.exports = router;
