// 适配
import 'lib-flexible';

// zarm 组件定制主题
document.documentElement.style.setProperty('--theme-primary', '#1890ff');

// 适配pc/mobile客户端
function adjustMode() {
  const isMobileMode = /Android|webOS|iPhone|BlackBerry/i.test(
    window.navigator.userAgent,
  );
  const isPadMode = /iPad|iPod/i.test(window.navigator.userAgent);
  if (isMobileMode) {
    // 移动端模式
    return true;
  } else if (isPadMode) {
    // pad模式，淘宝弹性布局方案lib-flexible不兼容ipad和ipad pro的解决方法
    let head, viewport;
    /(iPad|iPod)/i.test(navigator.userAgent) &&
      ((head = document.getElementsByTagName('head')),
      (viewport = document.createElement('meta')),
      (viewport.name = 'viewport'),
      (viewport.content =
        'target-densitydpi=device-dpi, width=480px, user-scalable=no'),
      head.length > 0 && head[head.length - 1].appendChild(viewport));
  } else {
    // pc模式，按照iPhone6 尺寸适配
    document.documentElement.style.fontSize = '37.5px';
  }
}
adjustMode();
