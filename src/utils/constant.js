const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
};

// 上右下左顺序
const POINTS = [
  {
    dirction: 'tl',
    styleFunc: ({ top, left }) => ({ top, left }),
  },
  {
    dirction: 't',
    styleFunc: ({ top, left, width }) => ({ top, left: left + width / 2 }),
  },
  {
    dirction: 'tr',
    styleFunc: ({ top, left, width }) => ({ top, left: left + width }),
  },
  {
    dirction: 'l',
    styleFunc: ({ top, left, height }) => ({ top: top + height / 2, left }),
  },
  {
    dirction: 'r',
    styleFunc: ({ top, left, height, width }) => ({
      top: top + height / 2,
      left: left + width,
    }),
  },
  {
    dirction: 'bl',
    styleFunc: ({ top, left, height }) => ({ top: top + height, left }),
  },
  {
    dirction: 'b',
    styleFunc: ({ top, left, height, width }) => ({
      top: top + height,
      left: left + width / 2,
    }),
  },
  {
    dirction: 'br',
    styleFunc: ({ top, left, height, width }) => ({
      top: top + height,
      left: left + width,
    }),
  },
];

// header 顶部操作区域
const HEADER_OPERRATIONS = [
  {
    key: 'icon-fontshangyibu',
    label: '上一步',
  },
  {
    key: 'icon-fontxiayibu',
    label: '下一步',
  },
  {
    key: 'icon-fontqingkong',
    label: '清空画布',
  },
  {
    key: 'icon-fontyulan',
    label: '预览',
  },
  {
    key: 'icon-fontfabu',
    label: '保存',
  },
];

const CONTEXT_MENUS = [
  {
    key: 'copy',
    label: '复制',
  },
  {
    key: 'delete',
    label: '删除',
  },
  {
    key: 'top',
    label: '置顶',
  },
  {
    key: 'bottom',
    label: '置底',
  },
];

const DEVICE_MAP = {
  'iPhone 5/SE': {
    width: 320,
    height: 568,
    baseFontSize: 32,
  },
  'iPhone 6/7/8': {
    width: 375,
    height: 667,
    baseFontSize: 37.5,
  },
  'iPhone 6/7/8 Plus': {
    width: 414,
    height: 736,
    baseFontSize: 41.4,
  },
  'iPhone X': {
    width: 375,
    height: 812,
    baseFontSize: 37.5,
  },
  iPad: {
    width: 768,
    height: 1024,
    baseFontSize: 48,
  },
};

const COMMON_FORM_ITEM_LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export {
  FORM_ITEM_LAYOUT,
  POINTS,
  HEADER_OPERRATIONS,
  CONTEXT_MENUS,
  DEVICE_MAP,
  COMMON_FORM_ITEM_LAYOUT,
};
