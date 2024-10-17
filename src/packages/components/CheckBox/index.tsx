import { LayerItem } from '@/packages/types/component';
import { getComponentStyle } from '@/packages/utils/style';
import { Checkbox } from 'antd';
import { observer } from 'mobx-react';
import { CSSProperties } from 'react';
import { ICheckBox } from './default';

const CheckBox = observer(({ properties }: LayerItem<ICheckBox>) => {
  const style = () => {
    const result = {
      ...getComponentStyle(properties),
    };
    return result as CSSProperties;
  };
  return (
    <Checkbox checked={properties.value.value} className="flex items-center" style={style()}>
      {properties.textContent.value}
    </Checkbox>
  );
});

export default CheckBox;
