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
}

const LayerContainter = observer(({ children, style, layer }: LayerContainterProps) => {
  const { setCurLayer, addLayer, curLayer } = editorStore;
  const { moveableRef } = eventStore;
  const { updateVisible } = contextmenuStore;
  const onDrop = (event: React.DragEvent) => {
    const e = event.nativeEvent;
    event.preventDefault();
    event.stopPropagation();
    const type = e.dataTransfer?.getData('type');
    const rectInfo = $(`#${layer?.id ? 'viewport_' + layer.id : 'viewport'}`).getBoundingClientRect();
    const com = EditorLoader.definitionMap[type]?.getInitConfig() as LayerItem;
    if (!type) return;
    const { zoom } = eventStore;
    const w = com.properties.width.value * zoom;
    const h = com.properties.height.value * zoom;
    com.properties.x.value = Math.round((e.clientX - rectInfo.x - w / 2) / zoom);
    com.properties.y.value = Math.round((e.clientY - rectInfo.y - h / 2) / zoom);
    if (layer) {
      com.pid = layer.id;
    }
    addLayer(com);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('LayerContainter');
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
      className={layer?.id === curLayer?.id && layer?.lock ? 'shadow-bd' : ''}
      style={style}
      onDrop={onDrop}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
});

export default LayerContainter;
