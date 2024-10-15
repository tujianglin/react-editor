import contextmenuStore from '@/Editor/store/contextmenuStore';
import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { LayerItem } from '@/packages/types/component';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
interface ShapeProps {
  children: React.ReactNode;
  style: React.CSSProperties;
  layer: LayerItem;
}
const Shape = observer(({ children, style, layer }: ShapeProps) => {
  const { setCurLayer } = editorStore!;
  const { setSelectedTargets, selectedTargets } = eventStore!;
  const { updateVisible, setPosition, sepPointPos } = contextmenuStore;
  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    sepPointPos({ e, pid: `viewport-${layer?.id}` });
    updateVisible(false);
    setCurLayer(layer);
  };

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedTargets.length) return;
    updateVisible(true);
    setPosition([e.clientX, e.clientY]);
  };
  useEffect(() => {
    // 如果是流式布局,就取消 moveable 的选中状态
    if (layer.lock) {
      setSelectedTargets([]);
    }
  }, [layer.lock]);
  return (
    <div className={!layer.lock ? 'layer-item' : ''} style={style} onMouseDown={onMouseDown} onContextMenu={onContextMenu}>
      {children}
    </div>
  );
});

export default Shape;
