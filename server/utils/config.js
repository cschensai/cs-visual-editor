// 路由前缀
const BASE_URL_PREFIX = '/cs-visual-editor';
// mysql 配置
const MY_SQL_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'Ww234840',
  database: 'cs-visual-editor',
  port: '3306',
  multipleStatements: true, // 允许多条sql同时执行
};

module.exports = {
  BASE_URL_PREFIX,
  MY_SQL_CONFIG,
};
