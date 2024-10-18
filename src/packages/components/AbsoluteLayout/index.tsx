import LayerContainer from '@/Editor/components/MainCanvas/components/LayerContainer';
import Shape from '@/Editor/components/MainCanvas/components/Shape';
import { DynamicComponent } from '@/packages/helper/DynamicComponent';
import { LayerItem } from '@/packages/types/component';
import { getLayerStyle, getWindowStyle } from '@/packages/utils/style';
import { observer } from 'mobx-react';
import { Fragment } from 'react/jsx-runtime';
import { IAbsoluteLayout } from './default';

const AbsoluteLayout = observer((layer: LayerItem<IAbsoluteLayout>) => {
  const { properties, children } = layer;
  return (
    <LayerContainer style={getWindowStyle(properties)} layer={layer}>
      {children.map((i) => (
        <Fragment key={i.id}>
          <Shape style={getLayerStyle(i)} layer={i}>
            <DynamicComponent is={i.type} {...i} />
          </Shape>
        </Fragment>
      ))}
    </LayerContainer>
  );
});

export default AbsoluteLayout;
