import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import DynamicComp from '@/pages/components/DynamicComp';
import ControlPoints from './ControlPoints';
// import Dragline from './Dragline';
import ContextMenu from './ContextMenu';
import { formatStyle } from '@/utils';
import { CanvasContext } from '@/utils/Context';
import styles from './index.less';

// setSelectedComp: 设置选中的组件
// selected: 是否是选中的组件，选中的组件加橙色标记边框

class Draggable extends Component {
  static contextType = CanvasContext;

  constructor(props) {
    super(props);
    this.state = {
      showContextMenu: false, // 组件右侧菜单
    };
  }

  componentDidMount() {
    // 点击root区域 conetxtMenu消失
    document
      .getElementById('root')
      .addEventListener('click', this.setShowContextMenu);

    // 注册组件
    const currComp = this.context.getComp(this.props.index);
    this.unRegisterCompsEntity = this.context.registerCompsEntity(
      currComp.onlyKey,
      this,
    );
  }

  componentWillUnmount() {
    document
      .getElementById('root')
      .removeEventListener('click', this.setShowContextMenu);
    this.unRegisterCompsEntity();
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  setShowContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showContextMenu: false });
  };

  handleDragStart = (e) => {
    this.setActive(e);
    const { pageX, pageY } = e;
    e.dataTransfer.setData('startPos', JSON.stringify({ pageX, pageY }));
  };

  setActive = (e) => {
    e.stopPropagation();
    const comp = this.context.getComp(this.props.index);
    this.context.setSelectedComp(comp);
  };

  // 右键快捷操作
  handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showContextMenu: true });
  };

  render() {
    const { showContextMenu } = this.state;
    const { index } = this.props;

    const comp = this.context.getComp(index);
    // const canvasStyle = this.context.getCanvasStyle();

    // 获取当前选中的组件
    const selectComp = this.context.getSelectedComp();

    // 标示被选中
    const selected = selectComp && selectComp.onlyKey === comp.onlyKey;
    const { style } = comp.data;
    return (
      <Fragment>
        <div
          id={`comp${comp.onlyKey}`}
          className={classnames({
            [styles.main]: true,
            [styles.selected]: selected,
            [styles.unSelected]: !selected,
          })}
          style={{
            ...formatStyle(style, true),
            zIndex: index,
          }}
          draggable
          onDragStart={this.handleDragStart}
          onClick={this.setActive}
          onContextMenu={this.handleContextMenu}
        >
          <DynamicComp comp={comp} />
          {/* { selected && <Dragline comp={comp} canvasStyle={canvasStyle}  /> } */}
        </div>
        {selected && <ControlPoints comp={comp} />}
        {showContextMenu && (
          <ContextMenu
            index={index}
            pos={{ top: style.top + 20, left: style.left + 60 }}
            comp={comp}
          />
        )}
      </Fragment>
    );
  }
}

export default Draggable;
