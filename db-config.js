var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_namki',
  password        : 'W3arismyfuckingcoat?',
  database        : 'cs340_namki'
});
module.exports.pool = pool;
