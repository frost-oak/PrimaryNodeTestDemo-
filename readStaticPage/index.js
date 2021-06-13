// 根据请求，读取对应的内容进行返回

const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');


const server = http.createServer(); 


//处理请求
server.on('request', (req, res) => {
    console.log(req.url);
    //req.url 就是对应每一个请求的文件名字，即地址。比如-XXX.jpg，这其实就是地址
    //读取首页内容，进行返回
    // 根据文件url设置mime类型 
    res.setHeader('content-type', mime.getType(req.url));
    fs.readFile(path.join(__dirname, 'pages', req.url), (err, data) => {
        if (err) {
            return console.log(err);            
        }
        res.end(data);
    })
    
    // res.end('ok');
})

//启动服务器
server.listen(9999, () => console.log('http://localhost:9999/index.html 服务器已启动'));