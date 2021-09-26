// 适配
import 'lib-flexible';

// zarm 组件定制主题
document.documentElement.style.setProperty('--theme-primary', '#1890ff');
const isMobileMode = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
  window.navigator.userAgent,
);
if (!isMobileMode) {
  document.documentElement.style.fontSize = '32px';
}
