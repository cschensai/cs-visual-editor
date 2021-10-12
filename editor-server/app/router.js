'use strict';

const { BASE_URL_PREFIX } = require('../config/constant');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.post(BASE_URL_PREFIX + '/add', controller.index.add);
  router.get(BASE_URL_PREFIX + '/get', controller.index.get);
};
