
var express = require('express');
var app = express();
let router = require("./router/router")
let path = require("path")

app.use(express.urlencoded({ extended: false }))
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "static")));

app.use('/', router);

console.log("正在监听3000端口")
app.listen(3000)

