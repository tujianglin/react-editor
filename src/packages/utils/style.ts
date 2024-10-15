import editorStore from '@/Editor/store/editorStore';
import { treeForEach } from '@/utils/tree';
import { CSSProperties } from 'react';
import { IProperties, LayerItem } from '../types/component';

function commonStyle(props: Partial<IProperties>) {
  return {
    width: `${props.width.value}px`,
    height: `${props.height.value}px`,
    fontSize: `${props.fontSize.value}px`,
    fontWeight: props.textBold.value ? 'bold' : 'normal',
    textDecoration: props.textLineStyle.value === 1 ? 'underline' : props.textLineStyle.value === 2 ? 'line-through' : props.textLineStyle.value === 3 ? 'overline' : 'none',
    color: `#${props.textColor.value}`,
    backgroundColor: `${props.backgroundColor?.value ? '#' + props.backgroundColor.value : ''}`,
    backgroundImage: props.backgroundImageSrc.value ? `url(${props.backgroundImageSrc.value})` : '',
    backgroundSize: props.backgroundImageLayout.value === 1 ? 'cover' : '',
    backgroundRepeat: props.backgroundImageLayout.value === 2 ? 'no-repeat' : '',
    backgroundPosition: props.backgroundImageLayout.value === 3 ? 'center' : '',
    opacity: props.opacity.value,
    visibility: props.visibility.value === 0 ? 'hidden' : props.visibility.value === 2 ? 'visible' : '',
    paddingBottom: `${props.paddingBottom.value}px`,
    paddingTop: `${props.paddingTop.value}px`,
    paddingLeft: `${props.paddingLeft.value}px`,
    paddingRight: `${props.paddingRight.value}px`,
    borderRadius: `${props.borderRadius.value}px`,
  } as CSSProperties;
}

export const getBaseShapeStyle = (layer: LayerItem) => {
  const { properties } = layer;
  return {
    width: `${properties.width.value}px`,
    height: `${properties.height.value}px`,
    transform: `translate(${properties.x.value}px, ${properties.y.value}px)`,
    position: 'absolute',
  } as CSSProperties;
};

export const getWindowStyle = (props: Partial<IProperties>) => {
  return {
    position: 'relative',
    ...commonStyle(props),
  } as CSSProperties;
};

export const getComponentStyle = (props: Partial<IProperties>) => {
  return {
    ...commonStyle(props),
    boxSizing: 'border-box',
  } as CSSProperties;
};

export const getLayerStyle = (layer: Partial<LayerItem>) => {
  const { properties } = layer;
  return {
    position: 'absolute',
    transform: `translate(${properties.x.value}px, ${properties.y.value}px)`,
    width: `${properties.width.value}px`,
    height: `${properties.height.value}px`,
  } as CSSProperties;
};

export const getFlowLayerStyle = (layer: Partial<LayerItem>) => {
  const { properties, pid } = layer;
  const { layerList } = editorStore;
  let fill = false;
  // 判断是否是填充元素
  treeForEach(layerList, (i) => {
    if (i.id === pid && (i.properties as any)?.fillItem?.value === properties.name.value) {
      fill = true;
    }
  });
  return {
    ...commonStyle(properties),
    width: `${fill ? '100%' : properties.width.value + 'px'}`,
    height: `${fill ? '100%' : properties.height.value + 'px'}`,
    marginTop: `${properties.marginTop.value}px`,
    marginBottom: `${properties.marginBottom.value}px`,
    marginLeft: `${properties.marginLeft.value}px`,
    marginRight: `${properties.marginRight.value}px`,
    boxSizing: 'border-box',
  } as CSSProperties;
};
