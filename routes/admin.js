const { response } = require('express');
var express = require('express');
const { render } = require('../app');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers');
var userHelpers = require('../helpers/user-helpers');


const email1="admin@gmail.com"
const password1="111";

router.get('/',(req,res)=>{
  res.render('admin/login')
})




router.post('/products',(req,res,next)=>{

  const {Email,Password}=req.body;
  if(Email==email1 && Password==password1){
    req.session.admin = true;
   
    
    res.redirect('/admin/view-products',{admin:true})}else{
      req.session.message=true;
      req.session.admin = false;
      res.redirect('/admin')
    }
    
 
})


router.get('/view-products', (req, res, next)=>{

  if (req.session.admin) {
  
  productHelpers.getAllProducts().then((products)=>{
   //console.log(products);

    res.render('admin/view-products',{admin:true,products});
  })}else{
    res.redirect('/admin')

  }
  
}
);



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

router.get('/allusers',(req,res)=>{
  userHelpers.getAllUsers().then((users)=>{
    res.render('admin/userdetails',{admin:true,users})
  })
})

router.get('/delete-product/:id',(req,res)=>{
  let prodId=req.params.id
  productHelpers.deleteProduct(prodId).then((response)=>{
    res.redirect('/admin')
  })
})

router.get('/delete-user/:id',(req,res)=>{
  let userId=req.params.id
  userHelpers.deleteUser(userId).then((response)=>{
    res.redirect('/admin/allusers')
  })
})

router.get('/edit-product/:id',async(req,res)=>{
  let product= await productHelpers.getProductDetails(req.params.id)
    res.render('admin/edit-product',{product,admin:true})
  
})

router.post('/edit-product/:id',(req,res)=>{
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
  })
})

router.get('/edit-user/:id',async(req,res)=>{
  let user= await userHelpers.getUserDetails(req.params.id)
    res.render('admin/edit-user',{user,admin:true})
  
})

router.post('/edit-user/:id',(req,res)=>{
  userHelpers.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('/admin/allusers')
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/admin')
})


module.exports = router;
