const Sequelize = require('sequelize');
const path = require('path');
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../data/admin.db'),
});//在你需要的地方，创建好这个database文件夹
console.log(path.resolve(__dirname, '../data/data.sqlite'));
module.exports = sequelize;