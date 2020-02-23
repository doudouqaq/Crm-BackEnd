var express = require('express');
const bodyParser=require("body-parser");
var router = express.Router();


// 解析application/json数据
var jsonParser = bodyParser.json();
// 解析application/x-www-form-urlencoded数据
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.post('/',urlencodedParser,function(req,res){
  res.send(req.body);
});

router.get("/login",function(req,res){
  console.log(req.query);
  res.send("登录路由，user为："+req.query.user+"==>   password为："+req.query.password);
});

module.exports = router;
