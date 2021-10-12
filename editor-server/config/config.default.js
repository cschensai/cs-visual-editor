/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
    },
    // 跨域配置
    cors: {
      origin: (ctx) => {
        // 客户端设置了credentials: 'include' 所以不能设置为*
        if (ctx.request.url.includes('/visual-editor')) {
          return 'http://localhost:8008'; // 允许来自所有域名请求
        }
        return '*';
      },
      exposeHeaders: [
        'WWW-Authenticate',
        'Server-Authorization',
        'x-test-code',
      ],
      maxAge: 5, //  该字段可选，用来指定本次预检请求的有效期，单位为秒
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'x-requested-with',
        'Content-Encoding',
      ],
    },
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1633681218609_1194';

  // add your middleware config here
  config.middleware = [];

  // sequelize配置
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'cs-visual-editor',
    username: 'root',
    password: 'Ww234840',
    define: {
      timestamps: true, // 默认添加createdAt,updatedAt,deletedAt时间戳
      // paranoid: true, // 设置软删除，删除时不删除数据，而是通过更新deleteAt标识删除
      freezeTableName: true, // 冻结表名，防止建表时表名修改为复数形式
      underscored: false, // 防止驼峰式字段被转为下划线
    },
    // 这里有坑，sequelize用的是UTC时间，我们在东八区，所以要加8
    // https://stackoverflow.com/questions/47367893/sequelize-reads-datetime-in-utc-only
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
      useUTC: false,
    },
    timezone: '+8:00',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    // 设置post请求 body体的大小，默认是100kb
    bodyParser: {
      jsonLimit: '1mb',
      formLimit: '1mb',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
