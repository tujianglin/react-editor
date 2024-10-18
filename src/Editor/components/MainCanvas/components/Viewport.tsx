import contextmenuStore from '@/Editor/store/contextmenuStore';
import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';
import InfiniteViewer from 'react-infinite-viewer';
import LayerContainter from './LayerContainer';

interface ViewportProps {
  children?: React.ReactNode;
}

const Viewport = observer(({ children }: ViewportProps) => {
  const infiniteViewerRef = useRef<InfiniteViewer>(null);
  const { setCurLayer } = editorStore;
  const { horizontalGuidesRef, verticalGuidesRef, setZoom, setSelectedTargets } = eventStore!;
  const { updateVisible } = contextmenuStore;
  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 点击空白区域,清除选中状态
    setCurLayer(null);
    setSelectedTargets([]);
    updateVisible(false);
  };

  useEffect(() => {
    infiniteViewerRef.current.scrollCenter();
    eventStore.setInfiniteViewerRef(infiniteViewerRef.current);
  }, []);

  return (
    <div className="wh-full" onMouseDown={onMouseDown} onContextMenu={(e) => e.preventDefault()}>
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
        <LayerContainter style={{ position: 'relative', width: '100%', height: '100%' }}>{children}</LayerContainter>
      </InfiniteViewer>
    </div>
  );
});

export default Viewport;
