import { ClusterOutlined, DesktopOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { observer } from 'mobx-react';
import { useState } from 'react';
import ComponentList from './components/ComponentList';
import LayerTree from './components/LayerTree';

const LeftPanel = observer(() => {
  const [selected, setSelected] = useState(['1']);
  const items = [
    { key: '1', icon: <DesktopOutlined /> },
    { key: '2', icon: <ClusterOutlined /> },
  ];

  return (
    <div className="wh-full flex">
      <div className="w-80px b-r-(1px solid #eee)">
        <Menu
          defaultSelectedKeys={selected}
          mode="inline"
          items={items}
          inlineCollapsed={true}
          onClick={({ key }) => {
            setSelected([key]);
          }}
        />
      </div>
      {selected[0] === '1' ? <ComponentList /> : <LayerTree />}
    </div>
  );
});

export default LeftPanel;
