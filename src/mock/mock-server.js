const Menu = require('./model/MenuModel');
const bodyParser = require('body-parser');
const server = (app) => {
    app.use(bodyParser.json());
    // 创建 application/x-www-form-urlencoded 编码解析
    app.use(bodyParser.urlencoded({extended: false}));

    // 菜单操作
    app.get('/menu', Menu.menuList);
    app.post('/menu', Menu.addMenu);
    app.put('/menu', Menu.updateMenu);
    app.delete('/menu', Menu.delMenu);

    app.get('/user', (req, res) => {
        res.json({a: 1});
    });
};
module.exports = server;