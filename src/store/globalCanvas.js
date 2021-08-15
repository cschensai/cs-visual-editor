import { useRef } from 'react';
import { getOnlyKey } from '../utils';

/**
 * 组件更新
 * 为了颗粒度细化
 * 目前设置的是 增删 组件全部更新
 * 组件更新的话，只更新组件自身
 */

/**
 * 函数命名规则
 * get 获取数据
 * set 设置数据
 * update 更新数据，包括数据更新和组件更新
 */

class Canvas {
  constructor() {
    this.compsEntity = new Map(); // 实例
    // 画布默认设置
    this.defaultCanvas = {
      // iphone5/se 尺寸
      style: {
        width: 320,
        hieght: 568,
        backgroundColor: '#fff',
        backgroundImage: '',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        boxSizing: 'content-box',
      },
      // 画布中的组件
      comps: [],
    };

    // 画布属性
    this.canvas = { ...this.defaultCanvas };

    // 画布更新历史
    this.canvasChangeHistory = [];
    // 画布步骤索引
    this.canvasIndex = -1;

    // state发生改变，需要执行的动作，如组件更新（监听器）
    this.listeners = [];

    // 被选中的组件
    this.selectedComp = null;

    // 画布之外的组件更新，如编辑区域
    this.storeChangeComps = [];
  }

  // 获取获取数据
  getCanvasData = () => {
    return { ...this.canvas };
  };

  // 获取上一步的画布历史
  getPrevCanvasHistory = () => {
    const index = this.canvasIndex - 1 < 0 ? 0 : this.canvasIndex - 1;
    // 存在 上一步 的操作
    if (index !== this.canvasIndex && this.canvasChangeHistory[index]) {
      this.canvasIndex = index;
      const lastCanvasHistory = this.canvasChangeHistory[index];
      this.canvas = lastCanvasHistory;

      this.runListeners();
    }
  };

  // 获取下一步的画布历史
  getNextCanvasHistory = () => {
    const canvasChangeHistoryIndex = this.canvasChangeHistory.length - 1;
    const index =
      this.canvasIndex + 1 > canvasChangeHistoryIndex
        ? canvasChangeHistoryIndex
        : this.canvasIndex + 1;
    // 存在 下一步 的操作
    if (index !== this.canvasIndex && this.canvasChangeHistory[index]) {
      this.canvasIndex = index;
      const nextCanvsHistory = this.canvasChangeHistory[index];
      this.canvas = nextCanvsHistory;

      this.runListeners();
    }
  };

  // 记录canvas更改历史及步骤索引
  recordCanvasChangeHistory = () => {
    this.canvasChangeHistory.push(this.canvas);
    this.canvasIndex = this.canvasChangeHistory.length - 1;
  };

  // get canvasStyle 获取canvas样式属性
  getCanvasStyle = () => {
    return { ...this.canvas.style };
  };

  // 更新整个画布
  // 需要把选中的组件设置为null，因为画布都更新了，意味着原来选中的组件也没有了
  updateCanvas = (canvas) => {
    this.selectedComp = null;
    this.canvas = { ...canvas };

    this.runListeners();
    this.recordCanvasChangeHistory();
  };

  // 清空canvas
  emptyCanvas = () => {
    this.canvas = { ...this.defaultCanvas };

    this.runListeners();
    this.recordCanvasChangeHistory();
  };

  // 更新canvas的样式
  updateCanvsStyle = (data) => {
    console.log('更新canvas的样式', this.canvasChangeHistory);
    const newCanvas = {
      ...this.canvas,
      style: {
        ...this.getCanvasStyle(),
        ...data,
      },
    };

    // 如果样式相同，则不更新canvas的样式
    if (JSON.stringify(this.newCanvas) === JSON.stringify(this.canvas)) {
      return false;
    }

    this.canvas = newCanvas;
    // 更新Content层级
    this.runListeners();
    this.recordCanvasChangeHistory();
  };

  // 画布之外的组件更新
  registerStoreChangeComps = (_comp) => {
    this.storeChangeComps.push(_comp);
    return () => {
      this.storeChangeComps = this.storeChangeComps.filter(
        (comp) => comp.onlyKey !== _comp.onlyKey,
      );
    };
  };

  // 注册组件实例
  registerCompEntity = (key, entity) => {
    this.compsEntity.set(key, entity);
    return () => {
      this.compsEntity.delete('key');
    };
  };

  forceCompUpdate = (..._comps) => {
    // 更新画布组件
    _comps.forEach((_comp) => {
      this.compsEntity.get(_comp.onlyKey).onStoreChange();
    });

    // 更新和画布组件相关的组件，如编辑区域
    this.storeChangeComps.forEach(({ onStoreChange }) => onStoreChange());
  };

  // 获取画布具体某个组件
  getComp = (index) => {
    const comps = this.getComps();
    return { ...comps[index] };
  };

  // 获取画布的组件 数组
  getComps = () => {
    return [...this.canvas.comps];
  };

  // 设置画布中的组件 数组
  setComps = (_comps) => {
    this.canvas = {
      ...this.canvas,
      comps: _comps,
    };
  };

  // 设置comps数据，并更新app
  updateComps = (_comps) => {
    this.setComps(_comps);

    this.runListeners();
    this.recordCanvasChangeHistory();
  };

  // 添加画布中的组件
  addComp = (_comp) => {
    // 将当前添加的组件作为选中的组件，并设置onlyKey
    this.selectedComp = {
      ..._comp,
      onlyKey: getOnlyKey(),
    };
    const comps = this.getComps();
    this.updateComps([...comps, this.selectedComp]);
  };

  // 更新canvas的某个组件
  updateComp = (_comp) => {
    const comps = this.getComps();
    for (let index = 0; index < comps.length; index++) {
      if (_comp.onlyKey === comps[index].onlyKey) {
        comps[index] = _comp;
        break;
      }
    }
    this.setComps(comps);
    this.forceCompUpdate(_comp);
  };

  /**
   * 选中组件的操作
   */
  // 获取选中的组件
  getSelectedComp = () => {
    return this.selectedComp;
  };

  // 设置选中的组件
  setSelectedComp = (_comp) => {
    // 如果当前选中的组件和要设置的组件是一个，则不再处理
    if (this.selectedComp === _comp) {
      return false;
    }
    let needForceUpdateComps = [];
    // 上一个选中的组件
    if (this.selectedComp) {
      needForceUpdateComps.push(this.selectedComp);
    }

    this.selectedComp = _comp;
    // 如果_comp为null，证明为取消选中，则这个时候只更新取消选中的组件就行了
    // 否则，下个要选中的组件也要更新
    if (this.selectedComp) {
      needForceUpdateComps.push(this.selectedComp);
    }

    // 更新上个选中和下个要选中的组件
    this.forceCompUpdate(...needForceUpdateComps);
  };

  // 再编辑区域更新组件的style、拖拽组件更新组件的style
  updateSelectedCompStyle = (_style, frequently) => {
    const _comp = this.getSelectedComp();
    const comp = {
      ..._comp,
      data: { ..._comp.data, style: { ..._comp.data.style, ..._style } },
    };

    // 如果之前选中的组件和当前更新的组件一致，则不再更新
    if (JSON.stringify(_comp) === JSON.stringify(comp)) {
      return false;
    }
    this.selectedComp = comp;
    this.updateComp(comp);
    if (!frequently) {
      this.recordCanvasChangeHistory();
    }
  };

  // 在编辑区域更新组件的value
  updateSelectedCompValue = (value) => {
    const _comp = this.getSelectedComp();
    const comp = {
      ..._comp,
      data: {
        ..._comp.data,
        value,
      },
    };
    this.selectedComp = comp;
    this.updateComp(comp);
    this.recordCanvasChangeHistory();
  };

  // 点击组件、右侧删除组件
  deleteSelectedComp = (_comp) => {
    // 设置选中的组件为null
    this.selectedComp(null);

    const comps = this.getComps();
    // 过滤到当前要删除的组件
    this.updateComps(comps.filter((comp) => comp.onlyKey !== _comp.onlyKey));
  };

  // 交换i、j位置的元素，置顶置底
  changeCompIndex = (i, j = this.getComps().length - 1) => {
    if (i === j) {
      return false;
    }
    const newComps = this.getComps();
    // 交换位置
    const temp = newComps[i];
    newComps[i] = newComps[j];
    newComps[j] = temp;
    this.updateComps(newComps);
  };

  // 现在只用到了更新整个app组件
  runListeners = () => {
    this.listeners.forEach((listener) => listener());
  };

  // 订阅 组件更新
  subscribe = (_listener) => {
    this.listeners.push(_listener);
    return () => {
      this.listeners.filter((listener) => listener !== _listener);
    };
  };

  // 返回canvas数据的增删改查函数
  getCanvas = () => {
    const returnFuncs = [
      'getCanvasData',
      'recordCanvasChangeHistory',
      'getPrevCanvasHistory',
      'getNextCanvasHistory',
      'updateCanvas',
      'emptyCanvas',
      'getCanvasStyle',
      'updateCanvsStyle',
      'registerStoreChangeComps',
      'registerCompEntity',
      'getComp',
      'getComps',
      'setComps',
      'addComp',
      'getSelectedComp',
      'selectedComp',
      'updateSelectedCompStyle',
      'updateSelectedCompValue',
      'deleteSelectedComp',
      'changeCompIndex',
      'subscribe',
    ];

    const obj = {};
    returnFuncs.forEach((func) => {
      obj[func] = this[func];
    });
    return obj;
  };
}

export const useCanvas = (canvas) => {
  const canvasRef = useRef();

  if (!canvasRef.current) {
    if (canvas) {
      canvasRef.current = canvas;
    } else {
      const globalCanvas = new Canvas();
      canvasRef.current = globalCanvas.getCanvas();
    }
  }
  return canvasRef.current;
};
