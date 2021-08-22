import React, { Component, Fragment } from 'react';
import { CanvasContext } from '../../utils/Context';
import EditorComp from './EditorComp';
import EditorCanvas from './EditorCanvas';
import styles from './index.less';

export default class Editor extends Component {
  static contextType = CanvasContext;

  constructor(props) {
    super(props);
    this.state = {
      showIndex: 0,
    };
  }

  componentDidMount() {
    this.unRegisterStoreChangeComps =
      this.context.registerStoreChangeComps(this);
  }

  componentWillUnmount() {
    this.unRegisterStoreChangeComps();
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  render() {
    const selectedComp = this.context.getSelectedComp();
    return (
      <div className={styles.main}>
        {selectedComp ? (
          <EditorComp selectedComp={selectedComp} globalCanvas={this.context} />
        ) : (
          <EditorCanvas globalCanvas={this.context} />
        )}
      </div>
    );
  }
}
