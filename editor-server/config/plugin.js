'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 引入egg-sequelize插件
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // cors跨域插件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
