import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import { PropValue, Type } from '@/packages/types/component';
import { BascLayerItem } from '@/packages/utils/config';
import { generateID } from '@/utils';
import { assign } from 'lodash-es';
import AbsoluteLayoutConfig from './config';
import AbsoluteLayout from './index';

/* 私有属性 */
export interface IAbsoluteLayout {
  hScroll: PropValue<boolean>;
  vScroll: PropValue<boolean>;
  layoutAlignment: PropValue<number>;
}

/* 私有属性枚举 */
enum AbsoluteLayoutPropEnum {
  hScroll = 42,
  vScroll,
  layoutAlignment,
}
class Properties implements IAbsoluteLayout {
  hScroll = {
    index: AbsoluteLayoutPropEnum.hScroll,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  vScroll = {
    index: AbsoluteLayoutPropEnum.vScroll,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  layoutAlignment = {
    index: AbsoluteLayoutPropEnum.layoutAlignment,
    type: Type.Int8,
    value: 0,
    metaData: '',
  };
}

class AbsoluteLayoutLayer extends BascLayerItem {
  constructor() {
    super();
    this.classType = 2; // 需修改
    this.name = '绝对定位容器';
    this.type = 'AbsoluteLayout';
    this.properties.name.value = generateID();
    this.properties.width.value = 300;
    this.properties.height.value = 300;
    this.properties = assign(this.properties, new Properties());
  }
}

export default class AbsoluteLayoutDefault extends AbstractDefinition<any, AbsoluteLayoutLayer> {
  getBaseInfo() {
    return {
      order: 2,
      name: '绝对定位容器',
      type: 'AbsoluteLayout',
    };
  }
  getInitConfig(): AbsoluteLayoutLayer {
    return { ...new AbsoluteLayoutLayer() };
  }
  getComponent() {
    return {
      type: 'AbsoluteLayout',
      comp: AbsoluteLayout,
    };
  }
  getComponentConfig() {
    return {
      type: 'AbsoluteLayoutConfig',
      comp: AbsoluteLayoutConfig,
    };
  }
}
