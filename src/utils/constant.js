const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 6,
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

export { FORM_ITEM_LAYOUT, POINTS };
