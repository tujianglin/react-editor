import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import { PropValue, Type } from '@/packages/types/component';
import { BascLayerItem } from '@/packages/utils/config';
import { generateID } from '@/utils';
import { assign } from 'lodash-es';
import VerticalLayoutConfig from './config';
import VerticalLayout from './index';

/* 私有属性 */
export interface IVerticalLayout {
  hScroll: PropValue<boolean>;
  vScroll: PropValue<boolean>;
  wrap: PropValue<boolean>;
  layoutAlignment: PropValue<0 | 1 | 2>;
  fillItem: PropValue;
}

/* 私有属性枚举 */
enum VerticalLayoutPropEnum {
  hScroll = 42,
  vScroll,
  wrap,
  layoutAlignment,
  fillItem,
}

class Properties implements IVerticalLayout {
  hScroll = {
    index: VerticalLayoutPropEnum.hScroll,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  vScroll = {
    index: VerticalLayoutPropEnum.vScroll,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  wrap = {
    index: VerticalLayoutPropEnum.vScroll,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  layoutAlignment = {
    index: VerticalLayoutPropEnum.layoutAlignment,
    type: Type.Int8,
    value: 0 as const,
    metaData: '',
  };
  fillItem = {
    index: VerticalLayoutPropEnum.fillItem,
    type: Type.String,
    value: '',
    metaData: '',
  };
}

class VerticalLayoutLayer extends BascLayerItem {
  constructor() {
    super();
    this.classType = 3; // 需修改
    this.type = 'VerticalLayout';
    this.name = '垂直布局容器';
    this.properties.name.value = generateID();
    this.properties.width.value = 200;
    this.properties.height.value = 400;
    this.properties = assign(this.properties, new Properties());
  }
}

export default class VerticalLayoutDefault extends AbstractDefinition<any, VerticalLayoutLayer> {
  getBaseInfo() {
    return {
      order: 3,
      name: '垂直布局容器',
      type: 'VerticalLayout',
    };
  }
  getInitConfig(): VerticalLayoutLayer {
    return { ...new VerticalLayoutLayer() };
  }
  getComponent() {
    return {
      type: 'VerticalLayout',
      comp: VerticalLayout,
    };
  }
  getComponentConfig() {
    return {
      type: 'VerticalLayoutConfig',
      comp: VerticalLayoutConfig,
    };
  }
}
