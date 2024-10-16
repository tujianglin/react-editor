import eventStore from '@/Editor/store/eventStore';
import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';
import Selecto from 'react-selecto';

const SelectArea = observer(() => {
  const selectoRef = useRef<Selecto>(null);

  useEffect(() => {
    eventStore.setSelectoRef(selectoRef.current);
  }, []);

  const { moveableRef, setSelectedTargets, selectedTargets } = eventStore;
  return (
    <Selecto
      ref={selectoRef}
      dragContainer={'.scena-viewer'}
      selectableTargets={['.layer-item']}
      hitRate={0}
      selectByClick={true}
      selectFromInside={false}
      toggleContinueSelect={['shift']}
      ratio={0}
      onDragStart={(e) => {
        e.inputEvent.preventDefault(); // 阻止框选时 Meta 或 Ctrl 相关的默认行为
        const target = e.inputEvent.target;
        const flatted = selectedTargets.flat(3) as Array<HTMLElement | SVGElement>;
        if (moveableRef.isMoveableElement(target) || flatted.some((t) => t === target || t.contains(target))) {
          e.stop();
        }
        e.data.startTargets = selectedTargets;
      }}
      onSelectEnd={(e) => {
        console.log(e)
        e.inputEvent.preventDefault(); // 阻止框选时 Meta 或 Ctrl 相关的默认行为
        const { isDragStartEnd, inputEvent } = e;
        if (isDragStartEnd) {
          inputEvent.preventDefault();
          moveableRef.waitToChangeTarget().then(() => {
            moveableRef.dragStart(inputEvent);
          });
        }
        setSelectedTargets?.(e.selected);
      }}
    />
  );
});

export default SelectArea;
