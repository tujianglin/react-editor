import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { $ } from '@/utils';
import { Tree } from 'antd';
import { cloneDeep } from 'lodash-es';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

const LayerTree = observer(() => {
  const { layerList, setCurLayer } = editorStore!;
  const { setSelectedTargets } = eventStore!;
  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    autorun(() => {
      setTreeData([
        {
          name: '系统',
          id: '1',
          children: cloneDeep(layerList),
        },
      ]);
    });
  }, []);
  return (
    <div className="p-10px flex-1">
      {treeData.length ? (
        <Tree
          treeData={treeData}
          fieldNames={{ title: 'name', key: 'id' }}
          blockNode
          defaultExpandAll
          showLine
          onSelect={(e, { selectedNodes }) => {
            if (!e.length) return;
            if (e[0] === '1') {
              setCurLayer(null);
              setSelectedTargets([]);
            } else {
              setCurLayer(selectedNodes[0]);
              setSelectedTargets([$(`#${selectedNodes[0].id}`)]);
            }
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
});

export default LayerTree;
