const sequelize = require('../conf/sequelize.conf');
const Sequelize = require('sequelize');

const Menu = sequelize.define('menu', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // 主键
        autoIncrement: true,// 自增
        comment: '字段描述',
    },
    typeName: {
        type: Sequelize.STRING,
    },
    parentId: {
        type: Sequelize.INTEGER,
    },
    modName: {
        type: Sequelize.STRING,
    },
    topId: {
        type: Sequelize.INTEGER,
    },
    sortRank: {
        type: Sequelize.INTEGER,
    },
    keywords: Sequelize.STRING,
    description: Sequelize.STRING,
    icon: Sequelize.STRING,

    // 通过references选项可以创建外键:
    /*bar_id: {
        type: Sequelize.INTEGER,
        references: {
            // 引用另一个模型
            model: Bar,
            // 连接模型的列表
            key: 'id',
            // 强制使用外键约束，仅适用于 PostgreSQL
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
    },*/
});
module.exports = Menu;
/*
const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING, //数据类型
        field: 'first_name', // 数据库字段名，即：数据库字段名为'first_name'，而对象属性名为'firstName'
    },
    lastName: {
        type: Sequelize.STRING,
    },

}, {
    freezeTableName: true, // 模型对应的表名与模型名将相同
});

User.sync().then(() => {
    return User.create({
        name: 'Lisi',
        lastName: '李四',
    });
});
*/
