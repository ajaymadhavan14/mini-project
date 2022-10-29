var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 let products = [
  {
    name:"Samsung S22",
    category:"Mobile",
    description:"Samsung Galaxy S22 5G Android smartphone. Announced Feb 2022. Features 6.1″ display, Exynos 2200 chipset, 3700 mAh battery, 256 GB storage, 8 GB RAM, ...",
    image:"https://m.media-amazon.com/images/I/71PvHfU+pwL._SX679_.jpg",
    price:90000
  },
  {
    name:"iPhone 14",
    category:"Mobile",
    description:"A magical new way to interact with iPhone. A vital safety feature designed to save lives. An innovative 48MP camera for mind-blowing detail. All powered ...",
    image:"https://media.croma.com/image/upload/v1662655485/Croma%20Assets/Communication/Mobiles/Images/261971_c8p8eb.png",
    price:100000
  },
  {
    name:"OnePlus 8",
    category:"Mobile",
    description:"OnePlus 8 Glacial Green,​ 5G Unlocked Android Smartphone U.S Version, 8GB RAM+128GB Storage, 90Hz Fluid Display,Triple Camera, with Alexa Built-in...",
    image:"https://m.media-amazon.com/images/I/61n6Ovq6EdL._SX679_.jpg",
    price:70000
  },
  {
    name:"vivo V25",
    category:"Mobile",
    description:"The 64MP HD main rear camera2 provide large 1.4μm pixel by combining four pixels into one for excellent sensitivity, it captures all of the night's beautiful ...",
    image:"https://www.reliancedigital.in/medias/Vivo-V25-Pro-Smart-Phones-493177359-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3w0MDA2NnxpbWFnZS9qcGVnfGltYWdlcy9oMjEvaGU0Lzk4ODA2NDczNjg3MzQuanBnfDg3ZDU5ZTU5YjhjN2IwMDUyYTVhNDBmOGRkMzdkYmE0MTY4Mjg5OWM4YWUzNDNiYmNhMzBmY2ZlNjE5YjdkNWI",
    price:50000
  }
 ]

  res.render('users/index',{user:true,products});
});

module.exports = router;

