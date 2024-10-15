import contextmenuStore from '@/Editor/store/contextmenuStore';
import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { LayerItem } from '@/packages/types/component';
import { $ } from '@/utils';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
interface ShapeProps {
  children: React.ReactNode;
  style: React.CSSProperties;
  layer: LayerItem;
}
const Shape = observer(({ children, style, layer }: ShapeProps) => {
  const { setCurLayer, curLayer } = editorStore!;
  const { setSelectedTargets, selectedTargets, moveableRef } = eventStore!;
  const { updateVisible, setPosition } = contextmenuStore;
  const onMouseDown = (event: React.MouseEvent) => {
    const e = event.nativeEvent;
    event.stopPropagation();
    console.log('Shape');
    if (layer) {
      const targets = [];
      // 容器内组件多选定义
      selectedTargets.map((i) => {
        if (i?.classList?.contains(layer.pid)) {
          targets.push(i);
        }
      });
      if (!targets.length && (event.currentTarget as HTMLElement).dataset.lock === 'false') {
        setSelectedTargets([$(`#${layer.id}`)]);
      } else {
        setSelectedTargets(targets);
      }
      setCurLayer(layer);
      // 触发拖拽事件
      setTimeout(() => {
        moveableRef.dragStart(e);
      });
    } else {
      updateVisible(false);
      setCurLayer(layer);
      setSelectedTargets([]);
    }
  };

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!curLayer) return;
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
    <div
      id={layer.id}
      className={classNames(!layer.lock ? 'layer-item' : '', layer?.id === curLayer?.id && layer?.lock ? 'shadow-bd' : 'shadow-sm', layer.pid)}
      data-lock={layer.lock}
      style={style}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
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

export default Shape;
