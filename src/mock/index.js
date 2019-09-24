// require('./model/menuModel');

let sequelize = require('./conf/sequelize.conf');
const Sequelize = require('sequelize');
/*
sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });*/

// 定义模型
var TeacherEssay = sequelize.define('teacherEssay', {
    EssayTitle: {
        type: Sequelize.STRING,
    },
    EssayPreview: {
        type: Sequelize.STRING,
    },
});

// 如果在TeacherEssay.sync()中写入force：true，
// 那么将在重新创建数据库之前删除原来的数据库
TeacherEssay.sync().then(function () {
    // Table created
    return TeacherEssay.create({
        EssayTitle: '欢迎来到数学乐园',
        EssayPreview: '这里是数学乐园',
    });
});