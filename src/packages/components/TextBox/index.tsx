import { LayerItem } from '@/packages/types/component';
import { getComponentStyle } from '@/packages/utils/style';
import { Input, InputNumber } from 'antd';
import { observer } from 'mobx-react';
import { CSSProperties } from 'react';
import { ITextBox } from './default';

const TextBox = observer(({ properties }: LayerItem<ITextBox>) => {
  const style = () => {
    const result = {
      ...getComponentStyle(properties),
    };
    return result as CSSProperties;
  };
  return (
    <>
      {properties.type?.value === 1 ? (
        <InputNumber style={style()} value={properties.value.value} placeholder={properties.placeholderText.value} />
      ) : [2, 3].includes(properties.type?.value) ? (
        <Input style={style()} value={properties.value.value} placeholder={properties.placeholderText.value} />
      ) : (
        <Input.Password style={style()} value={properties.value.value} placeholder={properties.placeholderText.value} />
      )}
    </>
  );
});

export default TextBox;
