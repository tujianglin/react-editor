import LayerContainer from '@/Editor/components/MainCanvas/components/LayerContainer';
import Shape from '@/Editor/components/MainCanvas/components/Shape';
import { DynamicComponent } from '@/packages/helper/DynamicComponent';
import { LayerItem } from '@/packages/types/component';
import { getLayerStyle, getWindowStyle } from '@/packages/utils/style';
import { observer } from 'mobx-react';
import { Fragment } from 'react';
import { IMyWindow } from './default';

const TextBox = observer((layer: LayerItem<IMyWindow>) => {
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

export default TextBox;
