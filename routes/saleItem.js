var express = require('express');
var router = express.Router();
var mysql = require("../config/mysql.js");

function getNowTime() {
    // 加0
    function add_10(num) {
        if (num < 10) {
            num = '0' + num
        }
        return num;
    }
    var myDate = new Date();
    myDate.getYear(); //获取当前年份(2位)
    myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    myDate.getDate(); //获取当前日(1-31)
    myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
    myDate.getHours(); //获取当前小时数(0-23)
    myDate.getMinutes(); //获取当前分钟数(0-59)
    myDate.getSeconds(); //获取当前秒数(0-59)
    myDate.getMilliseconds(); //获取当前毫秒数(0-999)
    myDate.toLocaleDateString(); //获取当前日期
    var nowTime = myDate.getFullYear() + '-' + add_10(myDate.getMonth()) + '-' + myDate.getDate() + ' ' + add_10(myDate.getHours()) + ':' + add_10(myDate.getMinutes()) + ':' + add_10(myDate.getSeconds());
    return nowTime;
}

// 查询所有输入出售数据
router.get('/', function (req, res, next) {
    mysql.query('select * from sale_item', function (err, item) {
        if (err) {
            console.log(err);
        } else {
            var result = {
                "message": "success",
                data: item
            }
            return res.jsonp(result);
        }
    })
});

// 添加出售数据
router.post('/add', function (req, res) {
    var item_name = req.body.item_name;
    var item_danwei = req.body.item_danwei;
    var item_num = req.body.item_num;
    var input_price = req.body.input_price;
    var sale_price = req.body.sale_price;
    var input_total =  req.body.input_total;
    var sale_total = req.body.sale_total;
    var customer_name = req.body.customer_name;
    var customer_phone = req.body.customer_phone;
    var time = getNowTime();


    var sql = "insert into sale_item(item_name, item_danwei, item_num, input_price, sale_price, input_total, sale_total, customer_name, customer_phone, time) values('" + item_name + "','" + item_danwei + "','" + item_num + "','" + input_price + "','" + sale_price + "','" + input_total + "','" + sale_total + "','" + customer_name + "','" + customer_phone + "','" + time + "')";
    console.log(sql);
    mysql.query(sql, function (err, item) {
        if (err) {
            console.log(err);
        } else {
            var result = {
                "message": "success",
            }
            return res.jsonp(result);
        }
    })
});

// 按照出售名称删除出售数据
router.post('/del', function (req, res) {
    var item_name = req.body.item_name;
    console.log(item_name);
    mysql.query("delete from sale_item where item_name='" + item_name + "'", function (err, item) {
        if (err) {
            console.log(err);
        } else {
            console.log(item);
            var result = {
                "message": "success",
            }
            return res.jsonp(result);
        }
    });
});

// 按照出售名称修改出售
router.post('/update', function (req, res) {
    var item_name = req.body.item_name;
    var item_danwei = req.body.item_danwei;
    var item_num = req.body.item_num;
    var input_price = req.body.input_price;
    var sale_price = req.body.sale_price;
    var input_total =  req.body.input_total;
    var sale_total = req.body.sale_total;
    var customer_name = req.body.customer_name;
    var customer_phone = req.body.customer_phone;
    var time = getNowTime();
    mysql.query("update sale_item set item_name='" + item_name + "',item_danwei='" + item_danwei + "',item_num='" + item_num + "',input_price='" + input_price + "',sale_price='" + sale_price + "',input_total='" + input_total + "',sale_total='" + sale_total + "',customer_name='" + customer_name + "',customer_phone='" + customer_phone + "',time='" +  time + "' where item_name='" + item_name +"'", function (err, item) {
        if (err) {
            console.log(err);
        } else {
            var result = {
                "message": "success",
                data: item
            }
            return res.jsonp(result);
        }
    });
});


// 按照出售名称查询出售
router.post('/search', function (req, res) {
    var item_name = req.body.item_name;

    var sql = "select * from sale_item";

    sql += " where item_name='" + item_name+"'";
    // sql = sql.replace("and", "where");
    mysql.query(sql, function (err, item) {
        if (err) {
            console.log(err);
        } else {
            var result = {
                "message": "success",
                data: item
            }
            return res.jsonp(result);
        }
    });
});


module.exports = router;