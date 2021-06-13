const express = require('express');
const fs = require('fs');
const path = require('path');


//创建外置路由实例
const router = express.Router();

//注册路由
router.get('/index', (req, res) => {
    // 1-读取数据的数据和模板引擎渲染， 返回给浏览器解析 
    readData(data => {
        //渲染
        res.render('index.html', data);
    });
})

router.get('/', (req, res) => {
    res.redirect('/index');
})
// 详情
router.get('/details', (req, res) => {
    // 获取前端传递id， 根据id查找对应数据，和模板引擎配合渲染 
    let id = req.query.id;
    readData(data => {
        let info = data.list.find(v => v.id == id); //查找对应数据
        // 渲染
        res.render('details.html', info);
    })
})

// 提交
router.get('/submit', (req, res) => {
    // 静态页面，直接读取返回
    res.sendFile(path.join(__dirname, 'pages', 'submit.html'));
});

// post方式添加
router.post('/add', (req, res) => {
   // 获取前端提交的数据， 把数据添加到数据库中（设置id), 添加完成后，跳转到首页
    let info = req.body; //默认值undefined 
    console.log(info);
    readData(data => {
        //设置id
        let id = data.list.length == 0 ? 1 : data.list[data.list.length - 1].id + 1;
        info.id = id; //设置id
        data.list.push(info); //追加
        data = JSON.stringify(data, null, 4); 
        //写入
        fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, 'utf-8', (err) => {
            if (err) {
              return console.log(err);              
            }  
            //跳转到首页
            res.redirect('/');
        })
    })
    
});




module.exports = router;

// 读取data.json数据
function readData(callback) {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf-8', (err, data) => {
        if (err) {
            return console.log(err);            
        }
        data = JSON.parse(data);
        // 如何处理数据
        callback && callback(data);
    })
}