import { LayerItem } from '@/packages/types/component';
import { getComponentStyle } from '@/packages/utils/style';
import { Input } from 'antd';
import { observer } from 'mobx-react';
import { CSSProperties } from 'react';
import { IMultilineTextBox } from './default';

const MultilineTextBox = observer(({ properties }: LayerItem<IMultilineTextBox>) => {
  const style = () => {
    const result = {
      ...getComponentStyle(properties),
    };
    return result as CSSProperties;
  };
  return <Input.TextArea value={properties.value.value} placeholder={properties.placeholderText.value} style={style()} />;
});

export default MultilineTextBox;
