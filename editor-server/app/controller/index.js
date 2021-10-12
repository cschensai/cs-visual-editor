'use strict';

const { Controller } = require('egg');

class IndexController extends Controller {
  async add() {
    const { ctx } = this;
    const res = await ctx.service.index.addService(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      code: 0,
      data: res,
    };
  }
  async get() {
    const { ctx } = this;
    const res = await ctx.service.index.getService(ctx.request.query.pageId);
    ctx.status = 201;
    ctx.body = {
      code: 0,
      data: res,
    };
  }
}

module.exports = IndexController;
