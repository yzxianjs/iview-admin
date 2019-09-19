const SqliteDB = require('./sqlite.conf.js').SqliteDB;


let file = './data/iviewData.db';

let sqliteDB = new SqliteDB(file);

// 查询数据
/// query data after update.

querySql = 'select * from menuType';

sqliteDB.queryData(querySql, dataDeal);

function dataDeal(objects) {
    for (var i = 0; i < objects.length; ++i) {
        console.log(objects[i]);
    }
}
