import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import { PropValue, Type } from '@/packages/types/component';
import { BascLayerItem } from '@/packages/utils/config';
import { generateID } from '@/utils';
import { assign } from 'lodash-es';
import ButtonConfig from './config';
import Button from './index';

/* 私有属性 */
export interface IButton {
  text: PropValue;
  iconSource: PropValue;
  iconIndex: PropValue<number>;
  iconWidth: PropValue<number>;
  iconHeight: PropValue<number>;
}

/* 私有属性枚举 */
enum ButtonPropEnum {
  text = 42,
  iconSource,
  iconIndex,
  iconWidth,
  iconHeight,
}
class Properties implements IButton {
  text = {
    index: ButtonPropEnum.text,
    type: Type.String,
    value: '',
    metaData: '',
  };
  iconSource = {
    index: ButtonPropEnum.iconSource,
    type: Type.String,
    value: '',
    metaData: '',
  };
  iconIndex = {
    index: ButtonPropEnum.iconIndex,
    type: Type.Int16,
    value: 0,
    metaData: '',
  };
  iconWidth = {
    index: ButtonPropEnum.iconWidth,
    type: Type.Int32,
    value: 0,
    metaData: '',
  };
  iconHeight = {
    index: ButtonPropEnum.iconHeight,
    type: Type.Int32,
    value: 0,
    metaData: '',
  };
}

class ButtonLayer extends BascLayerItem {
  constructor() {
    super();
    this.classType = 5; // 需修改
    this.type = 'Button';
    this.name = '按钮';
    this.properties.name.value = generateID();
    this.properties.width.value = 100;
    this.properties.height.value = 32;
    this.properties = assign(this.properties, new Properties());
  }
}

export default class ButtonDefault extends AbstractDefinition<any, ButtonLayer> {
  getBaseInfo() {
    return {
      order: 5,
      name: '按钮',
      type: 'Button',
    };
  }
  getInitConfig(): ButtonLayer {
    return { ...new ButtonLayer() };
  }
  getComponent() {
    return {
      type: 'Button',
      comp: Button,
    };
  }
  getComponentConfig() {
    return {
      type: 'ButtonConfig',
      comp: ButtonConfig,
    };
  }
}
