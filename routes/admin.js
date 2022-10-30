var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers');

/* GET users listing. */
router.get('/', function(req, res, next) {

   productHelpers.getAllProducts().then((products)=>{
    //console.log(products);

     res.render('admin/view-products',{admin:true,products});
   })
  
});


router.get('/add-product', (req,res)=> {
  
res.render('admin/add-product',{admin:true})
})

 
router.post('/add-product',(req,res)=>{
  //console.log(req.body);
  //console.log(req.files.Image);

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    console.log(id);

    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-product',{admin:true})
      }else{
              console.log("errr"+err);}
    })
   
  })
})


module.exports = router;
