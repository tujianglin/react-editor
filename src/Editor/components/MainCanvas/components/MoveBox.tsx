import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { LayerItem } from '@/packages/types/component';
import { $ } from '@/utils';
import { treeToList } from '@/utils/tree';
import { cloneDeep } from 'lodash-es';
import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';
import Moveable, { SnapDirections } from 'react-moveable';
import { DimensionViewable } from './ables/DimensionViewable';

const SNAP_DIRECTIONS: SnapDirections = {
  top: true,
  left: true,
  right: true,
  center: true,
  middle: true,
  bottom: true,
};

const MoveBox = observer(() => {
  const moveableRef = useRef<Moveable>(null);

  useEffect(() => {
    eventStore.setMoveableRef(moveableRef.current);
  }, []);

  const { selectedTargets, selectoRef } = eventStore!;
  const { updateCurLayer, updateLayer } = editorStore;
  const list = treeToList(cloneDeep(editorStore.layerList));

  return (
    <Moveable
      ref={moveableRef}
      target={selectedTargets}
      elementGuidelines={list.map((i) => ({
        element: $(`#${i.id}`),
      }))}
      ables={[DimensionViewable]}
      props={{
        dimensionViewable: true,
      }}
      draggable={!editorStore.curLayer?.lock}
      resizable={true}
      keepRatio={false}
      useAccuratePosition={true}
      useResizeObserver={true}
      useMutationObserver={true}
      edge={editorStore.curLayer?.edge}
      edgeDraggable={true}
      throttleResize={1}
      snappable={true}
      snapDirections={SNAP_DIRECTIONS}
      elementSnapDirections={SNAP_DIRECTIONS}
      renderDirections={editorStore.curLayer?.directions}
      onClickGroup={(e) => selectoRef?.clickTarget(e.inputEvent, e.inputTarget)}
      onDrag={(e) => {
        e.target.style.transform = e.transform;
      }}
      onDragEnd={(e) => {
        const { lastEvent } = e;
        if (lastEvent) {
          const { beforeTranslate } = lastEvent;
          if (!editorStore.curLayer) return;
          updateCurLayer({
            id: editorStore.curLayer.id,
            properties: {
              x: { value: Math.round(beforeTranslate[0]) },
              y: { value: Math.round(beforeTranslate[1]) },
            },
          });
        }
      }}
      onResize={(e) => {
        const { target, width, height, drag } = e;
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
      }}
      onResizeEnd={(e) => {
        const { lastEvent } = e;
        if (lastEvent) {
          const { width, height } = lastEvent;
          if (!editorStore.curLayer) return;
          updateCurLayer({
            id: editorStore.curLayer.id,
            properties: {
              width: { value: Math.round(width) },
              height: { value: Math.round(height) },
            },
          });
        }
      }}
      onDragGroup={(e) => {
        e.events.forEach((ev) => (ev.target.style.transform = ev.transform));
      }}
      onDragGroupEnd={(e) => {
        const data: Partial<LayerItem>[] = [];
        e.events.forEach((ev) => {
          const { target, lastEvent } = ev;
          if (lastEvent) {
            const { beforeTranslate } = lastEvent;
            data.push({
              id: target.id,
              properties: {
                width: { value: (target as HTMLElement).offsetWidth },
                height: { value: (target as HTMLElement).offsetHeight },
                x: { value: Math.round(beforeTranslate[0]) },
                y: { value: Math.round(beforeTranslate[1]) },
              },
            });
          }
        });
        updateLayer(data);
      }}
      onResizeGroup={(e) => {
        e.events.forEach((ev) => {
          ev.target.style.width = `${ev.width}px`;
          ev.target.style.height = `${ev.height}px`;
          ev.target.style.transform = ev.drag.transform;
        });
      }}
      onResizeGroupEnd={(e) => {
        const data: Partial<LayerItem>[] = [];
        e.events.forEach((ev) => {
          const { target, lastEvent } = ev;
          if (lastEvent) {
            const {
              drag: { translate },
            } = lastEvent;
            data.push({
              id: target.id,
              properties: {
                width: { value: (target as HTMLElement).offsetWidth },
                height: { value: (target as HTMLElement).offsetHeight },
                x: { value: Math.round(translate[0]) },
                y: { value: Math.round(translate[1]) },
              },
            });
          }
        });
        updateLayer(data);
      }}
    />
  );
});

export default MoveBox;
