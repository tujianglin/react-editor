import { LineDirection } from 'react-moveable';

export interface BaseInfo {
  order: number;
  name: string;
  type: string;
}

export enum Type {
  Bool = 1,
  Int8 = 2,
  Int16 = 3,
  Int32 = 4,
  Int64 = 5,
  Real = 10,
  String = 12,
  DateTime = 11,
  Array = 15,
  Source = 64,
  Event = 65,
}

export enum PropEnum {
  name = 1,
  width,
  height,
  x,
  y,
  z,
  visibility,
  opacity,
  backgroundImageSrc,
  backgroundImageIndex,
  backgroundImageLayout,
  backgroundColor,
  fontSize,
  fontFamily,
  textColor,
  textBold,
  textLineStyle,
  borderRadius,
  borderStyle,
  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  dock,
  enable,
  click,
  contextmenu,
  dblclick,
  keydown,
  keyup,
  'pointer.down',
  'pointer.up',
  'pointer.move',
  'pointer.enter',
  'pointer.leave',
  'pointer.hover',
  wheel,
}

export interface PropValue<T = string> {
  value: T;
  type?: Type;
  index?: number;
  metaData?: any;
}
export type IProperties<T = {}> = {
  /** 组件名称 */
  name: PropValue; // 组件的名称
  /** 组件宽度 */
  width: PropValue<number>; // 组件的宽度
  /** 组件高度 */
  height: PropValue<number>; // 组件的高度
  /** X 轴位置 */
  x: PropValue<number>; // 组件在 X 轴上的位置
  /** Y 轴位置 */
  y: PropValue<number>; // 组件在 Y 轴上的位置
  /** Z 轴位置 */
  z: PropValue<number>; // 组件在 Z 轴上的位置（用于层叠顺序）
  /** 可见性 */
  visibility: PropValue<0 | 1 | 2>; // 组件的可见性状态（0: 隐藏，1: 显示，2: 半透明）
  /** 不透明度 */
  opacity: PropValue<any>; // 组件的不透明度（0-1之间）
  /** 背景图片路径 */
  backgroundImageSrc: PropValue; // 背景图片的路径
  /** 背景图片索引 */
  backgroundImageIndex: PropValue<number>; // 背景图片的索引
  /** 背景图片布局 */
  backgroundImageLayout: PropValue<0 | 1 | 2 | 3>; // 背景图片的布局方式（0: 未知，1: 平铺，2: 伸展，3: 覆盖）
  /** 背景颜色 */
  backgroundColor: PropValue<any>; // 背景颜色（CSS 颜色字符串）
  /** 字体大小 */
  fontSize: PropValue<number>; // 字体大小（单位：像素）
  /** 字体家族 */
  fontFamily: PropValue; // 字体家族（CSS 字体家族字符串）
  /** 文本颜色 */
  textColor: PropValue<any>; // 文本颜色（CSS 颜色字符串）
  /** 文本加粗 */
  textBold: PropValue<boolean>; // 是否加粗文本（true: 加粗，false: 不加粗）
  /** 文本样式 */
  textLineStyle: PropValue<0 | 1 | 2 | 3>; // 文本样式（0: 未知，1: 普通，2: 斜体，3: 下划线）
  /** 圆角半径 */
  borderRadius: PropValue<number>; // 圆角半径（单位：像素）
  /** 边框样式 */
  borderStyle: PropValue<0 | 1 | 2>; // 边框样式（0: 无边框，1: 实线，2: 虚线）
  /** 内边距左侧 */
  paddingLeft: PropValue<number>; // 内边距左侧（单位：像素）
  /** 内边距顶部 */
  paddingTop: PropValue<number>; // 内边距顶部（单位：像素）
  /** 内边距右侧 */
  paddingRight: PropValue<number>; // 内边距右侧（单位：像素）
  /** 内边距底部 */
  paddingBottom: PropValue<number>; // 内边距底部（单位：像素）
  /** 外边距左侧 */
  marginLeft: PropValue<number>; // 外边距左侧（单位：像素）
  /** 外边距顶部 */
  marginTop: PropValue<number>; // 外边距顶部（单位：像素）
  /** 外边距右侧 */
  marginRight: PropValue<number>; // 外边距右侧（单位：像素）
  /** 外边距底部 */
  marginBottom: PropValue<number>; // 外边距底部（单位：像素）
  /** 对齐方式 */
  dock: PropValue<0 | 1 | 2 | 3 | 4 | 5>; // 对齐方式（0: 未知，1: 左对齐，2: 右对齐，3: 顶对齐，4: 底对齐，5: 中间对齐）
  /** 是否启用 */
  enable: PropValue<boolean>;
  /** 点击事件 */
  click: PropValue;
  /** 右键菜单事件 */
  contextmenu: PropValue;
  /** 双击事件 */
  dblclick: PropValue;
  /** 键盘按下事件 */
  keydown: PropValue;
  /** 键盘抬起事件 */
  keyup: PropValue;
  /** 鼠标按下事件 */
  'pointer.down': PropValue;
  /** 鼠标抬起事件 */
  'pointer.up': PropValue;
  /** 鼠标移动事件 */
  'pointer.move': PropValue;
  /** 鼠标进入事件 */
  'pointer.enter': PropValue;
  /** 鼠标离开事件 */
  'pointer.leave': PropValue;
  /** 鼠标悬停事件 */
  'pointer.hover': PropValue;
  /** 滚动事件 */
  wheel: PropValue;
} & T;

export type LayerItem<T = {}> = {
  id: string;
  type: string;
  classType?: number;
  properties: Partial<IProperties<T>>;
  children?: LayerItem[];
  pid?: string;
  /** 锁定 */
  lock?: boolean;
  /** 组件名称 */
  name?: string;
  /** 拖拽point */
  directions?: boolean | string[];
  /** 缩放方向 */
  edge?: boolean | Array<LineDirection>;
};

export interface ISystem {
  /** 主窗口 */
  name?: string;
  /** 目标屏幕宽 */
  width?: number;
  /** 目标屏幕高 */
  height?: number;
}
