//const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers');
var userHelpers = require('../helpers/user-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  let users=req.session.user
    productHelpers.getAllProducts().then((products)=>{
     //console.log(products);
      res.render('users/home',{products,users,user:true});
    })


});


router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('users/login',{message:req.session.message})
    req.session.message=false
  }
})

router.get('/signup',(req,res)=>{
  res.render('users/signup')
})


router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
   console.log(req.body);
   res.redirect('/login')
  })
  //res.redirect('/login')
})


router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.message=true;
      res.redirect('/login')
    }
  })
})


router.get('/logout',(req,res)=>{
  req.session.destroy()
  //res.header('Cache-Control', 'no-cache');
  res.redirect('/')
})


module.exports = router;

