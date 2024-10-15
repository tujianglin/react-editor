import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import { PropValue, Type } from '@/packages/types/component';
import { BascLayerItem } from '@/packages/utils/config';
import { generateID } from '@/utils';
import { assign } from 'lodash-es';
import HorizontalLayoutConfig from './config';
import HorizontalLayout from './index';

/* 私有属性 */
export interface IHorizontalLayout {
  hScroll: PropValue<boolean>;
  vScroll: PropValue<boolean>;
  wrap: PropValue<boolean>;
  layoutAlignment: PropValue<0 | 1 | 2>;
  fillItem: PropValue;
}

/* 私有属性枚举 */
enum HorizontalLayoutPropEnum {
  hScroll = 42,
  vScroll,
  wrap,
  layoutAlignment,
  fillItem,
}
class Properties implements IHorizontalLayout {
  hScroll = {
    index: HorizontalLayoutPropEnum.hScroll,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  vScroll = {
    index: HorizontalLayoutPropEnum.vScroll,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  wrap = {
    index: HorizontalLayoutPropEnum.wrap,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  layoutAlignment = {
    index: HorizontalLayoutPropEnum.layoutAlignment,
    type: Type.Int8,
    value: 0 as const,
    metaData: '',
  };
  fillItem = {
    index: HorizontalLayoutPropEnum.fillItem,
    type: Type.String,
    value: '',
    metaData: '',
  };
}

class HorizontalLayoutLayer extends BascLayerItem {
  constructor() {
    super();
    this.classType = 4; // 需修改
    this.name = '水平布局容器';
    this.type = 'HorizontalLayout';
    this.properties.name.value = generateID();
    this.properties.width.value = 400;
    this.properties.height.value = 200;
    this.properties = assign(this.properties, new Properties());
  }
}

export default class HorizontalLayoutDefault extends AbstractDefinition<any, HorizontalLayoutLayer> {
  getBaseInfo() {
    return {
      order: 4,
      name: '水平布局容器',
      type: 'HorizontalLayout',
    };
  }
  getInitConfig(): HorizontalLayoutLayer {
    return { ...new HorizontalLayoutLayer() };
  }
  getComponent() {
    return {
      type: 'HorizontalLayout',
      comp: HorizontalLayout,
    };
  }
  getComponentConfig() {
    return {
      type: 'HorizontalLayoutConfig',
      comp: HorizontalLayoutConfig,
    };
  }
}
