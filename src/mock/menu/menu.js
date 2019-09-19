const sqliteDB = require('../db.conf');
const instance = new sqliteDB('menuType');

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
        /*return new Promise((resolve, reject) => {
            self.instance.getAllData().then(res => {
                console.log(res);
                resolve(res);
            }, reason => {
                reject(reason);
            });
        });*/
    }

    findOneData() {

    }

    /**
     * 添加数据
     * @param field 添加字段
     * @param value 添加的数组数据
     */
    addData(field = [], value = []) {
        let tileData = [[1, 10, 10], [1, 11, 11], [1, 10, 9], [1, 11, 9]];

        let insertSql2 = `insert into ${this.tableName}(${field.join(',')}) values(${',?'.repeat(field.length).substring(1)})`;
        // console.log(insertSql2);
        sqliteDB.insertData(insertSql2, value);
    }
}

// let menu = new Menu();
// menu.list();
module.exports = new Menu;


// new Menu('menuType').addData(['typename', 'reid', 'topid', 'sortrank', 'modname'], [['表格', 0, 0, 1, 'table'], ['分页', 0, 0, 1, 'page']]);