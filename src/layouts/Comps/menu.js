import {
  isTextComponent,
  isButtonComponent,
  isImgComponent,
  isListComponent,
  isTabsComponent,
} from '../../utils';

const baseMenus = (width) => [
  {
    desc: '文本',
    data: {
      type: isTextComponent,
      value: '文本',
      iconfont: 'icon-fontwenben',
      style: {
        top: 1,
        left: 0,
        width,
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
        animationClsName: 'none',
        fontFamily: 'none',
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
        width,
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
        animationClsName: 'none',
        fontFamily: 'none',
      },
    },
  },
  {
    desc: '图片',
    data: {
      type: isImgComponent,
      // https://img.tusij.com/ips_asset/16/11/10/44/54/ab/ab06c00c974c83828a1ec4efb5bca2bf.png!l800_i_w?auth_key=1639324800-0-0-65182ed5f3ed55503bbfb02fb65b4663
      // https://img.tusij.com/ips_asset/16/11/10/44/54/09/09917bf7e35711c91d353fd7aebf2a38.png!l800_i_w?auth_key=1639324800-0-0-bd838424e74c24b3f0787ae4c4fb11d6
      // https://img.tusij.com/ips_asset/16/11/10/44/54/ae/aefd66a218248c11f5652ef1a6e64b19.png!l800_i_w?auth_key=1639324800-0-0-2a91660153714f43bf6087c3c800f17b
      value:
        'https://img.tusij.com/ips_asset/16/11/10/44/53/5a/5aac2e49feeb917d0071a29126964010.png!l800_i_w?auth_key=1639324800-0-0-fa311768fea7460b62100c4e6366a2e4',
      iconfont: 'icon-fontimage',
      style: {
        top: 0,
        left: 0,
        width,
        height: 100,
        borderRadius: 0,
        borderStyle: 'none',
        borderWidth: 0,
        borderColor: '#fff',
        animationClsName: 'none',
      },
    },
  },
];
const businessMenus = (width = 200) => [
  {
    desc: '列表组件',
    data: {
      type: isListComponent,
      iconfont: 'icon-fontliebiao',
      value:
        'https://www.fastmock.site/mock/3b83adfdb4747ac5f286e201f1410110/visual/img/list',
      style: {
        top: 0,
        left: 0,
        width,
        height: 600,
      },
    },
  },
  {
    desc: 'Tabs组件',
    data: {
      type: isTabsComponent,
      iconfont: 'icon-fontm-tabs',
      value: 'tabs组件',
      style: {
        top: 0,
        left: 0,
        width,
        height: 300,
      },
    },
  },
];
export { baseMenus, businessMenus };
