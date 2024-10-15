import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { observer } from 'mobx-react';
import { Fragment } from 'react/jsx-runtime';
import { styled } from 'styled-components';

const StyleComponentList = styled.div`
  grid-template-rows: repeat(auto-fill, 40px);
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 10px 10px;
  overflow: auto;
  transition: opacity 0.5s 0.5s;
`;

const ComponentList = observer(() => {
  const onDragStart = (e: React.DragEvent) => {
    const { infiniteViewerRef } = eventStore;
    const type = (e.target as HTMLDivElement)?.dataset.type;
    e.dataTransfer.setData('type', type);
    if (type === 'Window') {
      infiniteViewerRef.scrollCenter();
    }
  };

  const { componentList } = editorStore!;

  return (
    <StyleComponentList className="flex-1 grid h-100% p-10px" onDragStart={onDragStart}>
      {componentList.map((i) => (
        <Fragment key={i.type}>
          <div className="shadow-sm flex-center cursor-grab w-100px" draggable data-type={i.type}>
            {i.name}
          </div>
        </Fragment>
      ))}
    </StyleComponentList>
  );
});

export default ComponentList;
