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

// 查询所有输入订单数据
router.get('/', function (req, res, next) {
    mysql.query('select * from input_item', function (err, item) {
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

// 添加订单数据
router.post('/add', function (req, res) {
    var time = getNowTime();
　　//结果：Mon Aug 27 2018 20:59:22 GMT+0800 (中国标准时间), 直接用 new Date(时间戳) 格式转化获得当前时间；
    // var time=new Intl.DateTimeFormat('zh-Hans-CN',options).format(date);
    var item_name = req.body.item_name;
    var item_num = req.body.item_num;
    var item_jinjia = req.body.item_jinjia;
    var item_danwei = req.body.item_danwei;
    var item_total_input = parseInt(req.body.item_jinjia) * parseInt(req.body.item_num);

        // var item_name = "衣服";
    // var item_num = 10;
    // var item_jinjia = 100;
    // var item_danwei = "件";
    // var item_total_input = parseInt(item_jinjia) * parseInt(item_num);


    var sql = "insert into input_item(time, item_name, item_num, item_jinjia, item_danwei, item_total_input) values('" + time + "','" + item_name + "','" + item_num + "','" + item_jinjia + "','" + item_danwei + "','" + item_total_input + "')";
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

// 按照订单名称删除订单数据
router.post('/del', function (req, res) {
    var item_name = req.body.item_name;
    mysql.query("delete from input_item where item_name='" + item_name + "'", function (err, item) {
        if (err) {
            console.log(err);
        } else {
            var result = {
                "message": "success",
            }
            return res.jsonp(result);
        }
    });
});

// 按照订单名称修改订单
router.post('/update', function (req, res) {
    var item_name = req.body.item_name;
    var item_num = req.body.item_num;
    var item_jinjia = req.body.item_jinjia;
    var item_danwei = req.body.item_danwei;
    var item_total_input = parseInt(item_jinjia) * parseInt(item_num);
    mysql.query("update input_item set item_name='" + item_name + "',item_num='" + item_num + "',item_jinjia='" + item_jinjia + "',item_danwei='" + item_danwei + "',item_total_input='" + item_total_input + "' where item_name='" + item_name +"'", function (err, item) {
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


// 按照订单名称查询订单
router.post('/search', function (req, res) {
    var item_name = req.body.item_name;

    var sql = "select * from input_item";

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