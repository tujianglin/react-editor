import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import { PropValue, Type } from '@/packages/types/component';
import { BascLayerItem } from '@/packages/utils/config';
import { generateID } from '@/utils';
import { assign } from 'lodash-es';
import LabelConfig from './config';
import Label from './index';

/* 私有属性 */
export interface ILabel {
  /** 文本内容 */
  textContent: PropValue;
  /** 链接地址 */
  linkUrl: PropValue;
  /** 尺寸是否自适应 */
  autoSize: PropValue<boolean>;
  /** 行高，当为0时实际为文本高度（上下居中） */
  lineHeight: PropValue<number>;
  /**是否换行 */
  textWrap: PropValue<boolean>;
  /** 链接打开方式 0. 左对齐 1.右对齐 2.居中对齐 3. 居中对齐 */
  textAlign: PropValue<0 | 1 | 2 | 3>;
}

/* 私有属性枚举 */
enum LabelPropEnum {
  textContent = 42,
  linkUrl,
  autoSize,
  lineHeight,
  textWrap,
  textAlign,
}
class Properties implements ILabel {
  textContent = {
    index: LabelPropEnum.textContent,
    type: Type.String,
    value: '文本',
    metaData: '',
  };
  linkUrl = {
    index: LabelPropEnum.linkUrl,
    type: Type.String,
    value: '',
    metaData: '',
  };
  autoSize = {
    index: LabelPropEnum.autoSize,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  lineHeight = {
    index: LabelPropEnum.lineHeight,
    type: Type.Int32,
    value: 0,
    metaData: '',
  };
  textWrap = {
    index: LabelPropEnum.textWrap,
    type: Type.Bool,
    value: false,
    metaData: '',
  };
  textAlign = {
    index: LabelPropEnum.textAlign,
    type: Type.Int32,
    value: 0 as const,
    metaData: '',
  };
}

class LabelLayer extends BascLayerItem {
  constructor() {
    super();
    this.classType = 6; // 需修改
    this.name = '文本';
    this.type = 'Label';
    this.properties.name.value = generateID();
    this.properties.width.value = 100;
    this.properties.height.value = 32;
    this.properties = assign(this.properties, new Properties());
  }
}

export default class LabelDefault extends AbstractDefinition<any, LabelLayer> {
  getBaseInfo() {
    return {
      order: 6,
      name: '文本',
      type: 'Label',
    };
  }
  getInitConfig(): LabelLayer {
    return { ...new LabelLayer() };
  }
  getComponent() {
    return {
      type: 'Label',
      comp: Label,
    };
  }
  getComponentConfig() {
    return {
      type: 'LabelConfig',
      comp: LabelConfig,
    };
  }
}
