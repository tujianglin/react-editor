import editorStore from '@/Editor/store/editorStore';
import { LayerItem } from '@/packages/types/component';
import { getComponentStyle } from '@/packages/utils/style';
import { observer } from 'mobx-react';
import { CSSProperties, useEffect, useState } from 'react';
import { IImageView } from './default';

const ImageView = observer(({ properties }: LayerItem<IImageView>) => {
  const [src, setSrc] = useState('');
  useEffect(() => {
    const child = editorStore.resourceData.find((i) => i.name === properties.imgSource.value)?.children;
    child ? setSrc(child[properties.imgIndex.value]) : setSrc('');
  }, [properties.imgSource.value, properties.imgIndex.value]);
  const style = () => {
    const result = {
      ...getComponentStyle(properties),
    };
    return result as CSSProperties;
  };
  return <>{src ? <img src={src} style={style()} /> : <div style={style()} />}</>;
});

export default ImageView;
