const Menu = require('./menu/menu');
const server = (app) => {
    app.get('/menu', Menu.list);
    app.get('/user', (req, res) => {
        res.json({a: 1});
    });
};
module.exports = server;