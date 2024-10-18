import LayerContainer from '@/Editor/components/MainCanvas/components/LayerContainer';
import Shape from '@/Editor/components/MainCanvas/components/Shape';
import { DynamicComponent } from '@/packages/helper/DynamicComponent';
import { LayerItem } from '@/packages/types/component';
import { getFlowLayerStyle, getWindowStyle } from '@/packages/utils/style';
import { observer } from 'mobx-react';
import { CSSProperties, Fragment } from 'react';
import { IVerticalLayout } from './default';

const VerticalLayout = observer((layer: LayerItem<IVerticalLayout>) => {
  const { properties, children } = layer;

  const style = () => {
    const result = {
      ...getWindowStyle(properties),
      display: 'flex',
      flexDirection: 'column',
      alignItems: properties.layoutAlignment.value === 0 ? 'flex-start' : properties.layoutAlignment.value === 1 ? 'flex-end' : 'center',
      flexWrap: properties.wrap.value ? 'wrap' : 'nowrap',
    } as CSSProperties;
    return result;
  };
  return (
    <LayerContainer style={style()} layer={layer} containerType={'flow'}>
      {children.map((i) => {
        return (
          <Fragment key={i.id}>
            <Shape style={getFlowLayerStyle(i)} layer={i}>
              <DynamicComponent is={i.type} {...i} />
            </Shape>
          </Fragment>
        );
      })}
    </LayerContainer>
  );
});

export default VerticalLayout;
