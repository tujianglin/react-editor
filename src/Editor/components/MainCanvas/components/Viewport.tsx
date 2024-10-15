import EditorLoader from '@/Editor/loader/EditorLoader';
import contextmenuStore from '@/Editor/store/contextmenuStore';
import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { LayerItem } from '@/packages/types/component';
import { $ } from '@/utils';
import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';
import InfiniteViewer from 'react-infinite-viewer';

interface ViewportProps {
  children?: React.ReactNode;
}

const Viewport = observer(({ children }: ViewportProps) => {
  const infiniteViewerRef = useRef<InfiniteViewer>(null);

  const { sepPointPos } = contextmenuStore;

  useEffect(() => {
    infiniteViewerRef.current.scrollCenter();
    eventStore.setInfiniteViewerRef(infiniteViewerRef.current);
  }, []);

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
    editorStore.addLayer(com);
  };

  const { horizontalGuidesRef, verticalGuidesRef, setZoom } = eventStore!;
  const { setCurLayer } = editorStore!;

  const onMouseDown = (e: React.MouseEvent) => {
    console.log(e);
    e.stopPropagation();
    sepPointPos({ e, pid: 'viewport' });
    setCurLayer(null);
  };
  return (
    <InfiniteViewer
      ref={infiniteViewerRef}
      className="!pos-absolute top-30px left-30px w-[calc(100%-30px)] h-[calc(100%-30px)] scena-viewer"
      usePinch={true}
      useAutoZoom={true}
      useWheelScroll={true}
      useForceWheel={true}
      pinchThreshold={50}
      useResizeObserver={true}
      maxPinchWheel={3}
      onScroll={(e) => {
        horizontalGuidesRef?.scroll(e.scrollLeft);
        horizontalGuidesRef?.scrollGuides(e.scrollTop);
        verticalGuidesRef?.scroll(e.scrollTop);
        verticalGuidesRef?.scrollGuides(e.scrollLeft);
      }}
      onPinch={(e) => {
        setZoom(e.zoom);
      }}
    >
      <div id="viewport" className="pos-relative wh-full" onDrop={onDrop} onMouseDown={onMouseDown}>
        {children}
      </div>
    </InfiniteViewer>
  );
});

export default Viewport;
