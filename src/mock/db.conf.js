const SqliteDB = require('./sqlite.conf').SqliteDB;
const path = require('path');
let file = path.resolve(__dirname, './data/iviewData.db');
let connention = new SqliteDB(file);

class DB {
    constructor(tableName) {
        this.tableName = tableName;
        this.sql = null;
    }

    getAllData(sql) {
        // let querySql = 'select * from menuType';
        let querySql = `select * from ${this.tableName}`;
        return new Promise(((resolve, reject) => {
            connention.queryData(querySql, (res) => {
                if (res.length != 0) {
                    resolve(res);
                } else {
                    reject('获取失败');
                }
            });
        }));
    }

    getOneData() {

    }

    findOneData() {

    }

    /**
     * 添加数据
     * @param field 添加字段
     * @param value 添加的数组数据
     */
    addData(sql, value) {
        // let tileData = [[1, 10, 10], [1, 11, 11], [1, 10, 9], [1, 11, 9]];

        // let insertSql2 = `insert into ${this.tableName}(${field.join(',')}) values(${',?'.repeat(field.length).substring(1)})`;
        // console.log(insertSql2);
        connention.insertData(sql, value);
    }
}

module.exports = DB;