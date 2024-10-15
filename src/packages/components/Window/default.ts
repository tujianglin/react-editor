import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import { PropValue, Type } from '@/packages/types/component';
import { BascLayerItem } from '@/packages/utils/config';
import { generateID } from '@/utils';
import { assign } from 'lodash-es';
import Window from '.';
import WindowConfig from './config';

export interface IMyWindow {
  hScroll: PropValue<boolean>;
  vScroll: PropValue<boolean>;
  /** 无效暂无使用 */
  layoutAlignment: PropValue<number>;
  /** 标题 */
  Title: PropValue;
  /** 图标所属组 */
  IconSrcGroup: PropValue;
  /** 图标所属组索引 */
  IconScrIndex: PropValue<number>;
  /** 显示事件 */
  'window.show': PropValue;
  /** 关闭事件 */
  'window.close': PropValue;
}

enum MyWindowEnum {
  hScroll = 42,
  vScroll,
  layoutAlignment,
  Title,
  IconSrcGroup,
  IconScrIndex,
  'window.show',
  'window.close',
}
class Properties implements IMyWindow {
  hScroll = {
    index: MyWindowEnum.hScroll,
    type: Type.Bool,
    value: false,
    metaData: '',
  };

  vScroll = {
    index: MyWindowEnum.vScroll,
    type: Type.Bool,
    value: false,
    metaData: '',
  };

  layoutAlignment = {
    index: MyWindowEnum.layoutAlignment,
    type: Type.Int8,
    value: 0,
    metaData: '',
  };
  Title = {
    index: MyWindowEnum.Title,
    type: Type.String,
    value: '',
    metaData: '',
  };
  IconSrcGroup = {
    index: MyWindowEnum.IconSrcGroup,
    type: Type.String,
    value: '',
    metaData: '',
  };
  IconScrIndex = {
    index: MyWindowEnum.IconScrIndex,
    type: Type.Int8,
    value: 0 as const,
    metaData: '',
  };
  'window.show' = {
    index: MyWindowEnum['window.show'],
    type: Type.Event,
    value: '',
    metaData: '',
  };
  'window.close' = {
    index: MyWindowEnum['window.close'],
    type: Type.Event,
    value: '',
    metaData: '',
  };
}

export class WindowLayer extends BascLayerItem {
  constructor() {
    super();
    this.classType = 1;
    this.type = 'Window';
    this.name = '页面';
    this.properties.name.value = generateID();
    this.properties.width.value = 800;
    this.properties.height.value = 600;
    this.properties.backgroundColor.value = 'ffffff';
    this.properties = assign(this.properties, new Properties());
  }
}

export default class WindowDefault extends AbstractDefinition<any, WindowLayer> {
  getBaseInfo() {
    return {
      order: 1,
      name: '页面',
      type: 'Window',
    };
  }
  getInitConfig(): WindowLayer {
    return { ...new WindowLayer() };
  }
  getComponent() {
    return {
      type: 'Window',
      comp: Window,
    };
  }
  getComponentConfig() {
    return {
      type: 'WindowConfig',
      comp: WindowConfig,
    };
  }
}
