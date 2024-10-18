import { LayerItem } from '@/packages/types/component';
import { getComponentStyle } from '@/packages/utils/style';
import { observer } from 'mobx-react';
import { CSSProperties } from 'react';
import { ILabel } from './default';

const Label = observer(({ properties }: LayerItem<ILabel>) => {
  const style = () => {
    const result = {
      ...getComponentStyle(properties),
      lineHeight: `${properties.lineHeight.value === 0 ? 1 : properties.lineHeight.value + 'px'}`,
    };
    if ([0, 1, 2].includes(properties.textAlign.value)) {
      result.textAlign = properties.textAlign.value === 0 ? 'left' : properties.textAlign.value === 1 ? 'right' : 'center';
    }
    if (properties.textAlign.value === 3) {
      result.textAlign = 'center';
      result.letterSpacing = '3px';
    }
    return result as CSSProperties;
  };
  return (
    <div className={!properties.textWrap.value ? 'text-ellipsis' : ''} style={style()}>
      {properties.textContent.value}
    </div>
  );
});

export default Label;
