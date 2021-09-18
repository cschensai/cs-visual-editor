// 单独写一个文件 这样只会查u你更加爱你一个连接池
const mysql = require('mysql');
const { MY_SQL_CONFIG } = require('../utils/config');
// 创建连接池
const pool = mysql.createPool(MY_SQL_CONFIG);
global.dbPool = pool;
