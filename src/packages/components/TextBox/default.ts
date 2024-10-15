import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import { PropValue, Type } from '@/packages/types/component';
import { BascLayerItem } from '@/packages/utils/config';
import { generateID } from '@/utils';
import { assign } from 'lodash-es';
import TextBoxConfig from './config';
import TextBox from './index';

/* 私有属性 */
export interface ITextBox {
  /** 文本内容 */
  value: PropValue;
  /** 占位符文本 */
  placeholderText: PropValue;
  /** 输入框类型 1. 数字输入 2.数字 3.任意字符输入 4.密码输入 */
  type: PropValue<1 | 2 | 3 | 4>;
  /** 是否只读 */
  readOnly: PropValue<boolean>;
  changed: PropValue;
}

/* 私有属性枚举 */
enum TextBoxPropEnum {
  value = 42,
  placeholderText,
  type,
  readOnly,
  changed,
}
class Properties implements ITextBox {
  value = {
    index: TextBoxPropEnum.value,
    type: Type.String,
    value: '',
    metaData: '',
  };
  placeholderText = {
    index: TextBoxPropEnum.placeholderText,
    type: Type.String,
    value: '',
    metaData: '',
  };
  type = {
    index: TextBoxPropEnum.type,
    type: Type.Int8,
    value: 3 as const,
    metaData: '',
  };
  readOnly = {
    index: TextBoxPropEnum.readOnly,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  changed = {
    index: TextBoxPropEnum.changed,
    type: Type.Event,
    value: '',
    metaData: '',
  };
}

class TextBoxLayer extends BascLayerItem {
  constructor() {
    super();
    this.classType = 7;
    this.type = 'TextBox';
    this.name = '输入框';
    this.properties.name.value = generateID();
    this.properties.width.value = 100;
    this.properties.height.value = 32;
    this.properties = assign(this.properties, new Properties());
  }
}

export default class TextBoxDefault extends AbstractDefinition<any, TextBoxLayer> {
  getBaseInfo() {
    return {
      order: 7,
      name: '输入框',
      type: 'TextBox',
    };
  }
  getInitConfig(): TextBoxLayer {
    return { ...new TextBoxLayer() };
  }
  getComponent() {
    return {
      type: 'TextBox',
      comp: TextBox,
    };
  }
  getComponentConfig() {
    return {
      type: 'TextBoxConfig',
      comp: TextBoxConfig,
    };
  }
}
