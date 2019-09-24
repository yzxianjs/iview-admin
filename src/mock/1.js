const sequelize = require('./conf/sequelize.conf');
// const Sequelize = require('sequelize');
const _menu = require('./model/MenuModel');

class Menu {
    constructor() {
        _menu.sync();
    }

    menuList(req, res) {
        let result = [];
        _menu.findAll().then(res => {
            res.forEach(item => {
                result.push(item.dataValues);
            });
            res.status(200).json({data: result, msg: '查询结果', status: 200});
        }).catch(e => {
            res.status(400).json({data: result, msg: '查询异常', status: 400});
        });
    }

    addMenu(req, res) {
        const {typeName, parentid = 0, modName, topId = 0, sortRank = 50, keywords, description} = req.body;
        if (typeName == '' || modName == '') {
            res.status(400).json({msg: '参数不完整', status: 400});
        } else {
            _menu.create({
                typeName: typeName,
                parentId: parentId,
                modName: modName,
                topId: topId,
                sortRank: sortRank,
                keywords: keywords,
                description: description,
            });
            res.status(200).json({msg: '菜单添加完成', status: 200});
        }
    }
}

module.exports = Menu;

new Menu().menuList();