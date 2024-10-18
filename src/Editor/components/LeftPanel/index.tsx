import { ClusterOutlined, DesktopOutlined, FolderOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { observer } from 'mobx-react';
import { useState } from 'react';
import ComponentList from './components/ComponentList';
import LayerTree from './components/LayerTree';
import Resource from './components/Resource';

const LeftPanel = observer(() => {
  const [selected, setSelected] = useState(['1']);
  const items = [
    { key: '1', icon: <DesktopOutlined /> },
    { key: '2', icon: <ClusterOutlined /> },
    { key: '3', icon: <FolderOutlined /> },
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
      {selected[0] === '1' ? <ComponentList /> : selected[0] === '2' ? <LayerTree /> : <Resource />}
    </div>
  );
});

export default LeftPanel;
