import EditorLoader from '@/Editor/loader/EditorLoader';
import contextmenuStore from '@/Editor/store/contextmenuStore';
import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { DynamicComponent } from '@/packages/helper/DynamicComponent';
import { LayerItem } from '@/packages/types/component';
import { getLayerStyle, getWindowStyle } from '@/packages/utils/style';
import { $ } from '@/utils';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { Fragment } from 'react/jsx-runtime';
import { IAbsoluteLayout } from './default';

const AbsoluteLayout = observer(({ id, properties, children }: LayerItem<IAbsoluteLayout>) => {
  const { setCurLayer, addLayer } = editorStore;
  const { zoom, setSelectedTargets, selectedTargets } = eventStore;
  const { sepPointPos } = contextmenuStore;

  const onDrop = (event: React.DragEvent) => {
    const e = event.nativeEvent;
    event.preventDefault();
    event.stopPropagation();
    const type = e.dataTransfer?.getData('type');
    const rectInfo = $(`#viewport-${id}`).getBoundingClientRect();
    const com = EditorLoader.definitionMap[type].getInitConfig() as LayerItem;
    if (!type) return;
    const w = com.properties.width.value * zoom;
    const h = com.properties.height.value * zoom;
    com.properties.x.value = Math.round((e.clientX - rectInfo.x - w / 2) / zoom);
    com.properties.y.value = Math.round((e.clientY - rectInfo.y - h / 2) / zoom);
    com.pid = id;
    addLayer(com);
  };

  const onMouseDown = (e: React.MouseEvent, layer: LayerItem) => {
    e.stopPropagation();
    sepPointPos({ e, pid: layer.id });
    const targets = [];
    // 容器内组件多选定义
    selectedTargets.map((i) => {
      if (i?.classList?.contains(id)) {
        targets.push(i);
      }
    });
    if (!targets.length) {
      setSelectedTargets([$(`#${layer.id}`)]);
    } else {
      setSelectedTargets(targets);
    }
    setCurLayer(layer);
    // setTimeout(() => {
    //   moveableRef?.dragStart(e.nativeEvent); // 手动启动拖拽
    // }, 0);
  };

  return (
    <div id={`viewport-${id}`} style={getWindowStyle(properties)} onDrop={onDrop}>
      {children.map((i) => (
        <Fragment key={i.id}>
          <div id={i.id} className={classNames('shadow-sm', i.pid, !i.lock ? 'layer-item' : '')} style={getLayerStyle(i)} onMouseDown={(e) => onMouseDown(e, i)}>
            <DynamicComponent is={i.type} {...i} />
          </div>
        </Fragment>
      ))}
    </div>
  );
});

export default AbsoluteLayout;
