import { useState } from 'react';
import { Tabs } from 'zarm';
const { Panel } = Tabs;

export default function TabsComponent() {
  const [value, setValue] = useState(0);
  return (
    <Tabs value={value} onChange={setValue}>
      <Panel title="选项卡1">
        <div className="content">选项卡1内容</div>
      </Panel>
      <Panel title="选项卡2">
        <div className="content">选项卡2内容</div>
      </Panel>
    </Tabs>
  );
}
