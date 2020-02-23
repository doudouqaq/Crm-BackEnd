var express = require('express');
var app = express();


app.use('/v1/api', express.static('public'));
app.use('/', function(req, res){
    res.write('You maybe access /v1/api');
    res.end();
});

var server = app.listen(8002, function (){
    console.log('Example app listening on port 8002!');
});
// 设置服务永不超时
server.setTimeout(0)