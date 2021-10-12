'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Editor = app.model.define('editor', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(100),
    content: TEXT,
  });
  return Editor;
};
