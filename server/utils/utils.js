// 错误处理函数
function errHandler(ctx, msg) {
  ctx.body = {
    code: 500,
    data: {
      msg,
    },
  };
}

module.exports = {
  errHandler,
};
