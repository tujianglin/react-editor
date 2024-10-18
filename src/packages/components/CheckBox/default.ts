import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import { PropValue, Type } from '@/packages/types/component';
import { BascLayerItem } from '@/packages/utils/config';
import { generateID } from '@/utils';
import { assign } from 'lodash-es';
import CheckBoxConfig from './config';
import CheckBox from './index';

/* 私有属性 */
export interface ICheckBox {
  textContent: PropValue;
  value: PropValue<boolean>;
  changed: PropValue;
}

/* 私有属性枚举 */
enum CheckBoxPropEnum {
  textContent = 42,
  value,
  changed,
}

class Properties implements ICheckBox {
  textContent = {
    index: CheckBoxPropEnum.textContent,
    type: Type.String,
    value: '',
    metaData: '',
  };
  value = {
    index: CheckBoxPropEnum.value,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  changed = {
    index: CheckBoxPropEnum.changed,
    type: Type.Event,
    value: '',
    metaData: '',
  };
}

class CheckBoxLayer extends BascLayerItem {
  constructor() {
    super();
    this.classType = 11; // 需修改
    this.type = 'CheckBox';
    this.name = '复选框';
    this.properties.name.value = generateID();
    this.properties.width.value = 100;
    this.properties.height.value = 32;
    this.properties = assign(this.properties, new Properties());
  }
}

export default class CheckBoxDefault extends AbstractDefinition<any, CheckBoxLayer> {
  getBaseInfo() {
    return {
      order: 11,
      name: '复选框',
      type: 'CheckBox',
    };
  }
  getInitConfig(): CheckBoxLayer {
    return { ...new CheckBoxLayer() };
  }
  getComponent() {
    return {
      type: 'CheckBox',
      comp: CheckBox,
    };
  }
  getComponentConfig() {
    return {
      type: 'CheckBoxConfig',
      comp: CheckBoxConfig,
    };
  }
}
