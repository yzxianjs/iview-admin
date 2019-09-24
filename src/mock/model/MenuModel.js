const sequelize = require('../conf/sequelize.conf');
const Sequelize = require('sequelize');

const MenuModel = sequelize.define('menu', {
    // 不要添加时间戳属性 (updatedAt, createdAt)

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
}, {timestamps: false});

class MenuController {
    constructor() {
        MenuModel.sync();
    }

    /**
     * 菜单列表
     * @param req
     * @param res
     */
    menuList(req, res) {
        let result = [];
        MenuModel.findAll().then(data => {
            data.forEach(item => {
                result.push(item.dataValues);
            });
            // console.log(result);
            res.status(200).json({data: result, msg: '查询结果', status: 200});
        }, reason => {
            console.log(reason);
            res.status(400).json({data: result, msg: '查询异常', status: 400});
        });
    }

    /**
     * 添加菜单
     * @param req
     * @param res
     */
    addMenu(req, res) {
        const {typeName, parentId = 0, modName, topId, sortRank = 50, keywords, description, icon = null} = req.body;

        if (typeName == '' || modName == '') {
            res.status(400).json({msg: '参数不完整', status: 400});
        } else {
            // console.log(req.body);
            MenuModel.create({
                typeName: typeName,
                parentId: parentId,
                modName: modName,
                topId: topId,
                sortRank: sortRank,
                keywords: keywords,
                description: description,
                icon: icon,
            });
            res.status(200).json({msg: '菜单添加完成', status: 200});
        }
    }

    /**
     * 更新菜单
     * @param req
     * @param res
     */
    updateMenu(req, res) {
        const {id, typeName, parentId = 0, modName, topId, sortRank = 50, keywords, description, icon = null} = req.body;
        if (typeName == '' || modName == '') {
            res.status(400).json({msg: '参数不完整', status: 400});
        }
        let data = {
            typeName: typeName,
            parentId: parentId,
            modName: modName,
            topId: topId,
            sortRank: sortRank,
            keywords: keywords,
            description: description,
            icon: icon,
        };
        MenuModel.update(data, {where: {id: id}}).then(data => {
            if (data[0] == 0) {
                res.status(400).json({msg: '更新失败,数据未变化', status: 400});
            } else if (data[0] == 1) {
                res.status(200).json({msg: '更新成功,1条数据更新', status: 200});
            }
        }, reason => {
            res.status(400).json({msg: '更新失败,数据未变化', status: 400});
        });
    }

    delMenu(req, res) {
        const {id} = req.query;
        console.log(id);
        MenuModel.destroy({where: {id: id}}).then(data => {
            console.log(data);
            res.status(200).json({msg: '删除成功', status: 200});
        }, reason => {
            res.status(400).json({msg: '删除失败', status: 400});
        });
    }
}

module.exports = new MenuController;

// new MenuController().updateMenu();

/*
MenuModel.create({
    typeName: '首页',
    parentId: 0,
    modName: 'home',
    topId: 0,
    sortRank: 1,
    keywords: '首页',
    description: '首页',
    icon: '首页',
});
// module.exports = new MenuController;
MenuModel.findAll().then(data => {
    console.log(data);
}, reason => {
});*/
