import EditorLoader from '@/Editor/loader/EditorLoader';
import contextmenuStore from '@/Editor/store/contextmenuStore';
import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { LayerItem } from '@/packages/types/component';
import { $ } from '@/utils';
import { observer } from 'mobx-react';

interface LayerContainterProps {
  children: React.ReactNode;
  style: React.CSSProperties;
  layer?: LayerItem;
  containerType?: 'flow' | 'absolute';
}

const LayerContainter = observer(({ children, style, layer, containerType }: LayerContainterProps) => {
  const { setCurLayer, addLayer, curLayer } = editorStore;
  const { moveableRef, zoom, selectedTargets, setSelectedTargets } = eventStore;
  const { updateVisible, sepPointPos } = contextmenuStore;
  const onDrop = (event: React.DragEvent) => {
    const e = event.nativeEvent;
    event.preventDefault();
    event.stopPropagation();
    const type = e.dataTransfer?.getData('type');
    const rectInfo = $(`#${layer?.id ? 'viewport_' + layer.id : 'viewport'}`).getBoundingClientRect();
    const com = EditorLoader.definitionMap[type]?.getInitConfig() as LayerItem;
    if (!type) return;
    const w = com.properties.width.value * zoom;
    const h = com.properties.height.value * zoom;
    com.properties.x.value = Math.round((e.clientX - rectInfo.x - w / 2) / zoom);
    com.properties.y.value = Math.round((e.clientY - rectInfo.y - h / 2) / zoom);
    if (layer) {
      com.pid = layer.id;
      if (containerType === 'flow') {
        // 容器如果是流式布局，则锁定，且设置拖拽方向
        com.lock = true;
        com.edge = ['n', 'nw', 'ne', 's', 'se', 'sw', 'e', 'w'];
        com.directions = ['n', 'nw', 'ne', 's', 'se', 'sw', 'e', 'w'];
      }
      if (layer.type === 'AbsoluteLayout') {
        com.properties.z.value = 20;
      }
    }
    addLayer(com);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('LayerContainter');
    const targets = [];
    selectedTargets.map((i) => {
      if (i?.classList?.contains(layer.pid)) {
        targets.push(i);
      }
    });
    if (!targets.length && (e.currentTarget as HTMLElement).dataset.lock === 'false') {
      setSelectedTargets([$(`#${layer.id}`)]);
    } else {
      setSelectedTargets(targets);
    }
    sepPointPos({ e, layer });
    setCurLayer(layer);
    updateVisible(false);
    // 触发拖拽
    setTimeout(() => {
      moveableRef.dragStart(e.nativeEvent);
    });
  };

  return (
    <div
      id={layer?.id ? 'viewport_' + layer.id : 'viewport'}
      className={layer?.id === curLayer?.id ? 'shadow-bd' : ''}
      style={style}
      onDrop={onDrop}
      onMouseDown={onMouseDown}
      onPointerUp={() => {
        // 鼠标抬起,停止拖动事件
        setTimeout(() => {
          moveableRef.stopDrag();
        }, 100);
      }}
    >
      {children}
    </div>
  );
});

export default LayerContainter;
