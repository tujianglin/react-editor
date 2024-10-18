import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import { PropValue, Type } from '@/packages/types/component';
import { BascLayerItem } from '@/packages/utils/config';
import { generateID } from '@/utils';
import { assign } from 'lodash-es';
import ImageViewConfig from './config';
import ImageView from './index';

/* 私有属性 */
export interface IImageView {
  imgSource: PropValue;
  imgIndex: PropValue<number>;
}

/* 私有属性枚举 */
enum ImageViewPropEnum {
  imgSource = 42,
  imgIndex,
}
class Properties implements IImageView {
  imgSource = {
    index: ImageViewPropEnum.imgSource,
    type: Type.String,
    value: '',
    metaData: '',
  };
  imgIndex = {
    index: ImageViewPropEnum.imgIndex,
    type: Type.Int32,
    value: 0,
    metaData: '',
  };
}

class ImageViewLayer extends BascLayerItem {
  constructor() {
    super();
    this.classType = 13; // 需修改
    this.type = 'ImageView';
    this.name = '图片';
    this.properties.name.value = generateID();
    this.properties.width.value = 100;
    this.properties.height.value = 100;
    this.properties = assign(this.properties, new Properties());
  }
}

export default class ImageViewDefault extends AbstractDefinition<any, ImageViewLayer> {
  getBaseInfo() {
    return {
      order: 13,
      name: '图片',
      type: 'ImageView',
    };
  }
  getInitConfig(): ImageViewLayer {
    return { ...new ImageViewLayer() };
  }
  getComponent() {
    return {
      type: 'ImageView',
      comp: ImageView,
    };
  }
  getComponentConfig() {
    return {
      type: 'ImageViewConfig',
      comp: ImageViewConfig,
    };
  }
}
