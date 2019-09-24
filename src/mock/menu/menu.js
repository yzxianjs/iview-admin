const sqliteDB = require('../db.conf');
const instance = new sqliteDB('menuType');
const tableName = 'menuType';

class Menu {
    constructor(tableName = 'menuType') {
        this.tableName = 'menuType';
        // this.instance = new sqliteDB(this.tableName);
    }

    list(req, res) {
        let self = this;
        instance.getAllData().then(result => {
            res.json(JSON.stringify(result));
            /*console.log(result);
            let menuList = result;
            menuList = menuList.sort((a, b) => {
                return a.sotrank - b.sotrank;
            }).map(row => {
                row.children = [];
                return row;
            }).map(row => {
                menuList.forEach(item => {
                    if (row.reid == item.id) {
                        item.children.push(row);
                    }
                });
                return row;
            }).filter(row => row.topid == 0);
            
            console.log(menuList)*/

        }, reason => {
            res.status(500).json({'msg': '失败'});
        });
    }

    findOneData() {

    }

    /**
     * 添加数据
     * @param field 添加字段
     * @param value 添加的数组数据
     */
    addData(req, res) {
        if (req.body.field != null || req.body.value != null) {
            console.log(req.body);
            let field = req.body.field || [], value = req.body.value || [];
            let tileData = [[1, 10, 10], [1, 11, 11], [1, 10, 9], [1, 11, 9]];
            console.log(field);
            console.log(field.join('=='));
            console.dir(field);
            console.log('insert into ' + tableName + ' (' + field.join() + ') values( ' + ',?'.repeat(field.length).substring(1) + ' )');

            let inserSql = 'insert into ' + tableName + ' (' + field.join() + ') values( ' + ',?'.repeat(field.length).substring(1) + ' )';
            let insertSql2 = `insert into ${tableName}(${field.join(',')}) values(${',?'.repeat(field.length).substring(1)})`;
            instance.addData(inserSql, value);

            res.status(200).json({msg: '新增成功', status: 200});
        } else {
            res.status(400).json({msg: '参数错误', status: 400});
        }
    }
}

// let menu = new Menu();
// menu.list();
module.exports = new Menu;

// let sql = "insert into tiles(level, column, row) values(?, ?, ?)"

// new Menu('menuType').addData(['typename', 'reid', 'topid', 'sortrank', 'modname'], [['表格', 0, 0, 1, 'table'], ['分页', 0, 0, 1, 'page']]);