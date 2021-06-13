var express = require('express')
const fs = require('fs')
const path = require('path')
// 创建 express实例，也就是创建 express服务器
var app = express()
app.use(express.static('web'))
// 路由
app.get('/', function (req, res) {
  // res.setHeader('content-type', mime.getType(req.url));
  //这里如果我们有一个html页面的话，就很容易得到req.url了。到时候req.url替换jpg就可以了
  res.sendFile(path.join(__dirname, 'web', 'true.jpg'));
  // res.send('Hello World!')
})

// 启动服务器
app.listen(3000, function () {
  console.log('123,服务器——启！')
})