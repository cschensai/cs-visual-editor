import { useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';

// 获取唯一的key
export const getOnlyKey = () => {
  return Math.random();
};

// hooks useForceUpdate
export const useForceUpdate = () => {
  const [, setstate] = useState(0);

  const update = useCallback(() => {
    setstate((prev) => prev + 1);
  }, []);
  return update;
};

// 检查是否有px
export const checkPx = (newStyle, names) => {
  for (const name of names) {
    const newStyleName = newStyle[name];
    // 处理真机预览兼容性问题
    if (
      newStyleName &&
      !`${newStyleName}`.includes('rem') &&
      !`${newStyleName}`.includes('px')
    ) {
      newStyle[name] = `${newStyleName}px`;
    }
  }

  return newStyle;
};

// 规范style，如果传入的样式不带px单位，则加上
export const formatStyle = (style, noDel) => {
  let newStyle = { ...style };
  const names = ['width', 'height', 'lineHeight', 'fontSize', 'borderWidth'];
  newStyle = checkPx(newStyle, names);
  if (!noDel) {
    delete newStyle.top;
    delete newStyle.right;
    delete newStyle.bottom;
    delete newStyle.left;
    delete newStyle.transform;
    delete newStyle.borderWidth;
    delete newStyle.animationName;
  }
  return newStyle;
};

export function isNotEqualUndefined(value) {
  return value !== undefined;
}

// 防抖，闭包处理
export const debounce = (func, wait = 500) => {
  let timer;
  return () => {
    if (timer) clearTimeout(timer);
    else timer = setTimeout(func, wait);
  };
};

// 手动处理 px2rem
export const px2Rem = (getCanvasData) => {
  if (getCanvasData) {
    // 处理真机预览兼容性问题 按照真机ipone6 dpr: 1 fontSize: 37.5px 进行设置处理, base-font-size
    const baseFontSize = 37.5;
    const { style: canvasStyle, comps = [] } = cloneDeep(getCanvasData);
    canvasStyle.width = `${canvasStyle.width / baseFontSize}rem`;
    canvasStyle.height = `${canvasStyle.height / baseFontSize}rem`;
    comps.forEach((comp) => {
      const { style: compStyle } = comp.data || {};
      for (const key in compStyle) {
        if (Object.hasOwnProperty.call(compStyle, key)) {
          const compAttrVal = compStyle[key];
          if (typeof compAttrVal === 'number') {
            compStyle[key] = `${compAttrVal / baseFontSize}rem`;
          }
        }
      }
    });
    return { style: canvasStyle, comps };
  }
};

// 文本组件
export const isTextComponent = 0;
// 按钮组件
export const isButtonComponent = 1;
// 图片组件
export const isImgComponent = 2;
// 列表组件
export const isListComponent = 3;
// tabs组件
export const isTabsComponent = 4;
