import {
  isTextComponent,
  isButtonComponent,
  isImgComponent,
} from '../../utils';

const menus = [
  {
    desc: '文本',
    data: {
      type: isTextComponent,
      value: '文本',
      iconfont: 'icon-fontwenben',
      style: {
        top: 1,
        left: 0,
        width: 80,
        height: 30,
        lineHeight: 30,
        fontSize: 12,
        fontWeight: 'normal',
        color: '#000',
        backgroundColor: '#fff',
        textAlign: 'left',
        borderRadius: 0,
        borderStyle: 'none',
        borderWidth: 0,
        borderColor: '#fff',
      },
    },
  },
  {
    desc: '按钮',
    data: {
      type: isButtonComponent,
      value: '按钮',
      iconfont: 'icon-fontanniu',
      style: {
        top: 0,
        left: 0,
        width: 80,
        height: 30,
        lineHeight: 30,
        fontSize: 12,
        fontWeight: 'normal',
        color: '#000', //"#ff0000",
        backgroundColor: '#fff', //"#f5deb3",
        textAlign: 'left',
        borderRadius: 0,
        borderStyle: 'none',
        borderWidth: 0,
        borderColor: '#fff',
      },
    },
  },
  {
    desc: '图片',
    data: {
      type: isImgComponent,
      value:
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1333208373,3297678241&fm=26&gp=0.jpg',
      iconfont: 'icon-fontimage',
      style: {
        top: 0,
        left: 0,
        width: 200,
        height: 100,
        borderRadius: 0,
        borderStyle: 'none',
        borderWidth: 0,
        borderColor: '#fff',
      },
    },
  },
];

export { menus };
