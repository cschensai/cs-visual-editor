const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const log4js = require('log4js');
const cors = require('koa2-cors');
const static = require('koa-static');
const Router = require('koa-router');

// 接口统一前缀
const { BASE_URL_PREFIX } = require('./utils/config');
const { errHandler } = require('./utils/utils');
// 创建数据库连接池 只会创建一次
require('./database/createPool');

// 路由处理
const router = new Router();
const index = require('./routes/index');

// error handler
onerror(app);

// middlewares
app.use(
  cors({
    origin: 'http://localhost:8000',
    // 客户端设置了credentials: 'include' 所以不能设置为*
    // origin: '*',
    credentials: true,
  }),
);
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
app.use(json());
app.use(static(__dirname + '/public'));

// logjs
log4js.configure({
  appenders: { log: { type: 'file', filename: 'logs/serverLog.js' } },
  categories: { default: { appenders: ['log'], level: 'error' } },
});
const lo4jsLog = log4js.getLogger('log');

// 统一处理异常
try {
  app.use(async (ctx, next) => {
    await next();
  });
} catch (error) {
  lo4jsLog.error(error);
  errHandler(ctx, error);
}

// routes
router.use(BASE_URL_PREFIX, require('./routes/index'));
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;