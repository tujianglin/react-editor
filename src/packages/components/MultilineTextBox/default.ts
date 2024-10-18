import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import { PropValue, Type } from '@/packages/types/component';
import { BascLayerItem } from '@/packages/utils/config';
import { generateID } from '@/utils';
import { assign } from 'lodash-es';
import MultilineTextBoxConfig from './config';
import MultilineTextBox from './index';

/* 私有属性 */
export interface IMultilineTextBox {
  value: PropValue;
  placeholderText: PropValue;
  readOnly: PropValue<boolean>;
  changed: PropValue;
}

/* 私有属性枚举 */
enum MultilineTextBoxPropEnum {
  value = 42,
  placeholderText,
  readOnly,
  changed,
}

class Properties implements IMultilineTextBox {
  value = {
    index: MultilineTextBoxPropEnum.value,
    type: Type.String,
    value: '',
    metaData: '',
  };
  placeholderText = {
    index: MultilineTextBoxPropEnum.placeholderText,
    type: Type.String,
    value: '',
    metaData: '',
  };
  readOnly = {
    index: MultilineTextBoxPropEnum.readOnly,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  changed = {
    index: MultilineTextBoxPropEnum.changed,
    type: Type.Event,
    value: '',
    metaData: '',
  };
}

class MultilineTextBoxLayer extends BascLayerItem {
  constructor() {
    super();
    this.classType = 8; // 需修改
    this.type = 'MultilineTextBox';
    this.name = '多行文本';
    this.properties.name.value = generateID();
    this.properties.width.value = 100;
    this.properties.height.value = 32;
    this.properties = assign(this.properties, new Properties());
  }
}

export default class MultilineTextBoxDefault extends AbstractDefinition<any, MultilineTextBoxLayer> {
  getBaseInfo() {
    return {
      order: 8,
      name: '多行文本',
      type: 'MultilineTextBox',
    };
  }
  getInitConfig(): MultilineTextBoxLayer {
    return { ...new MultilineTextBoxLayer() };
  }
  getComponent() {
    return {
      type: 'MultilineTextBox',
      comp: MultilineTextBox,
    };
  }
  getComponentConfig() {
    return {
      type: 'MultilineTextBoxConfig',
      comp: MultilineTextBoxConfig,
    };
  }
}
