const Router = require('koa-router');
const router = new Router();
const { sqlQuery } = require('../database/sqlQuery');
const { errHandler } = require('../utils/utils');

router.post('/add', async (ctx) => {
  try {
    const { name, content } = ctx.request.body;
    const sql = `INSERT INTO land_page(name, content) VALUES(?, ?)`;
    const value = [name, content];
    await sqlQuery(sql, value);
    ctx.body = {
      code: 0,
      data: { msg: '发布成功' },
    };
  } catch (error) {
    errHandler(ctx, error);
  }
});

router.get('/get', async (ctx) => {
  try {
    const { pageId } = ctx.request.query;
    const sql = `SELECT * FROM land_page WHERE id=? LIMIT 1`;
    const value = [pageId];
    const data = await sqlQuery(sql, value);
    ctx.body = {
      code: 0,
      data: data[0],
    };
  } catch (error) {
    errHandler(ctx, error);
  }
});

module.exports = router.routes();
