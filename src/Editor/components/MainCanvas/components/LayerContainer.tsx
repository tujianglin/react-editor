import EditorLoader from '@/Editor/loader/EditorLoader';
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

const LayerContainter = observer(({ children, style }: LayerContainterProps) => {
  const { setCurLayer, addLayer } = editorStore;
  const onDrop = (event: React.DragEvent) => {
    const e = event.nativeEvent;
    event.preventDefault();
    event.stopPropagation();
    const type = e.dataTransfer?.getData('type');
    const rectInfo = $('#viewport').getBoundingClientRect();
    const com = EditorLoader.definitionMap[type]?.getInitConfig() as LayerItem;
    if (!type) return;
    const { zoom } = eventStore;
    const w = com.properties.width.value * zoom;
    const h = com.properties.height.value * zoom;
    com.properties.x.value = Math.round((e.clientX - rectInfo.x - w / 2) / zoom);
    com.properties.y.value = Math.round((e.clientY - rectInfo.y - h / 2) / zoom);
    addLayer(com);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    console.log(e);
    e.stopPropagation();
    setCurLayer(null);
  };
  return (
    <div id={'viewport'} style={style} onDrop={onDrop} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
});

export default LayerContainter;
