var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_shimp',
  password        : '3205',
  database        : 'cs340_shimp'
});
module.exports.pool = pool;
