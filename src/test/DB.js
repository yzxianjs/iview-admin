const fs = require('fs');
const Sqlite3 = require('sqlite3').verbose();

class DB {
    constructor(file) {
        this.db = new Sqlite3.Database(file);
        this.exist = fs.existsSync(file);
        if (!this.exist) {
            console.log('数据库已经存在');
            fs.openSync(file);
        }
    }

    printError(err) {
        console.log(`Error Message ${err.message}`);
    }

    createTable(sql) {
        this.db.serialize(() => {
            this.db.run(sql, err => {
                if (err != null) {
                    this.printError(err);
                    return;
                }
            });
        });
    }
}

module.exports = DB;

let db = new DB('./test.db');

