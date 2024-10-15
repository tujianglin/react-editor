import eventStore from '@/Editor/store/eventStore';
import Guides from '@scena/react-guides';
import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';

interface IRulerProps {
  children: React.ReactNode;
}
const Ruler = observer(({ children }: IRulerProps) => {
  const horizontalGuidesRef = useRef<Guides>(null);
  const verticalGuidesRef = useRef<Guides>(null);

  useEffect(() => {
    eventStore.setHorizontalGuidesRef(horizontalGuidesRef.current);
    eventStore.setVerticalGuidesRef(verticalGuidesRef.current);
  }, []);

  const { zoom } = eventStore!;

  const unit = Math.round(Math.floor(1 / zoom) * 50) || 50;
  return (
    <>
      <div
        className="pos-absolute bg-#eee w-30px h-30px b-r-(1px solid #eee) b-b-(1px solid #eee) top-0 left-0 cursor-pointer"
        onClick={() => {
          const { infiniteViewerRef } = eventStore;
          infiniteViewerRef!.scrollCenter({ duration: 500, absolute: true });
        }}
      />
      <Guides
        className={'pos-absolute !h-30px !left-30px !w-[calc(100%-30px)] bg-#fff'}
        ref={horizontalGuidesRef}
        type={'horizontal'}
        backgroundColor="#eee"
        textColor="#555"
        lineColor="#ccc"
        useResizeObserver={true}
        displayDragPos={true}
        displayGuidePos={true}
        zoom={zoom}
        unit={unit}
      />
      <Guides
        className={'pos-absolute !w-30px  !h-[calc(100%-30px)] bg-#fff'}
        ref={verticalGuidesRef}
        type={'vertical'}
        backgroundColor="#eee"
        textColor="#555"
        lineColor="#ccc"
        useResizeObserver={true}
        displayDragPos={true}
        displayGuidePos={true}
        zoom={zoom}
        unit={unit}
      />
      {children}
    </>
  );
});
export default Ruler;
