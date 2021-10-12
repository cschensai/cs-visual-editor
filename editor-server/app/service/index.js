'use strict';

const { Service } = require('egg');

class IndexService extends Service {
  async addService(body) {
    const res = await this.ctx.model.Editor.create(body);
    return res;
  }
  async getService(id) {
    // 根据主键查询记录
    const res = await this.ctx.model.Editor.findByPk(id);
    return res;
  }
}
module.exports = IndexService;
