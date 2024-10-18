import { LayerItem } from '@/packages/types/component';
import { getComponentStyle } from '@/packages/utils/style';
import { Button as AButton } from 'antd';
import { observer } from 'mobx-react';
import { CSSProperties } from 'react';
import { IButton } from './default';

const Button = observer(({ properties }: LayerItem<IButton>) => {
  const style = () => {
    const result = {
      ...getComponentStyle(properties),
    };
    return result as CSSProperties;
  };
  return <AButton style={style()}>{properties.text.value}</AButton>;
});

export default Button;
