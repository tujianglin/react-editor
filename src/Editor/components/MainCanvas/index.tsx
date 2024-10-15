import { DynamicComponent } from '@/packages/helper/DynamicComponent';
import { getBaseShapeStyle } from '@/packages/utils/style';
import { observer } from 'mobx-react';
import { Fragment, lazy, memo } from 'react';
import editorStore from '../../store/editorStore';
import ContextMenu from './components/ContextMenu';
import Ruler from './components/Ruler';
import SelectArea from './components/SelectArea';
import Shape from './components/Shape';
import Viewport from './components/Viewport';

const MoveBox = lazy(() => import('./components/MoveBox'));

const MainCanvas = memo(
  observer(() => {
    const { layerList } = editorStore!;

    return (
      <div className="pos-relative wh-full">
        <Ruler>
          <SelectArea />
          <Viewport>
            <MoveBox />
            {layerList.map((i) => (
              <Fragment key={i.id}>
                <Shape style={getBaseShapeStyle(i)} layer={i}>
                  <DynamicComponent is={i.type} {...i} />
                </Shape>
              </Fragment>
            ))}
          </Viewport>
        </Ruler>
        <ContextMenu />
      </div>
    );
  }),
);

export default MainCanvas;
