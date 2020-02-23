var express = require('express');
var router = express.Router();
var mysql = require("../config/mysql.js");

// 查询所有输入订单数据
router.get('/', function (req, res, next) {
    mysql.query('select * from current_item', function (err, item) {
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
    var item_name = req.body.item_name;
    var item_num = req.body.item_num;
    var item_danwei = req.body.item_danwei;

        // var item_name = "衣服";
    // var item_num = 10;
    // var item_jinjia = 100;
    // var item_danwei = "件";
    // var item_total_input = parseInt(item_jinjia) * parseInt(item_num);


    var sql = "insert into current_item(item_name, item_num, item_danwei) values('" + item_name + "','" + item_num +  "','" + item_danwei + "')";
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
    mysql.query("delete from current_item where item_name='" + item_name + "'", function (err, item) {
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
    var item_danwei = req.body.item_danwei;
    mysql.query("update current_item set item_name='" + item_name + "',item_num='" + item_num + "',item_danwei='" +  item_danwei + "' where item_name='" + item_name +"'", function (err, item) {
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

    var sql = "select * from current_item";

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