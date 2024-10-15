import { generateID } from '@/utils';
import { IProperties, LayerItem, PropEnum, Type } from '../types/component';

export class BascLayerItem implements LayerItem {
  public id = generateID();
  public classType: number;
  public pid: string;
  public name: string;
  public lock = false;
  public directions = true;
  public edge = true;
  public type: string;
  public children = [];
  public properties = {
    name: {
      index: PropEnum.name,
      type: Type.String,
      value: '',
      metaData: '',
    },
    width: {
      index: PropEnum.width,
      type: Type.Int32,
      value: 100,
      metaData: '',
    },
    height: {
      index: PropEnum.height,
      type: Type.Int32,
      value: 100,
      metaData: '',
    },
    x: {
      index: PropEnum.x,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    y: {
      index: PropEnum.y,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    z: {
      index: PropEnum.z,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    visibility: {
      index: PropEnum.visibility,
      type: Type.Int8,
      value: 1,
      metaData: '',
    },
    opacity: {
      index: PropEnum.opacity,
      type: Type.Real,
      value: 1,
      metaData: '',
    },
    backgroundImageSrc: {
      index: PropEnum.backgroundImageSrc,
      type: Type.String,
      value: '',
      metaData: '',
    },
    backgroundImageIndex: {
      index: PropEnum.backgroundImageIndex,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    backgroundImageLayout: {
      index: PropEnum.backgroundImageLayout,
      type: Type.Int8,
      value: 0,
      metaData: '',
    },
    backgroundColor: {
      index: PropEnum.backgroundColor,
      type: Type.Int32,
      value: '',
      metaData: '',
    },
    fontSize: {
      index: PropEnum.fontSize,
      type: Type.Int32,
      value: 16,
      metaData: '',
    },
    fontFamily: {
      index: PropEnum.fontFamily,
      type: Type.String,
      value: '',
      metaData: '',
    },
    textColor: {
      index: PropEnum.textColor,
      type: Type.Int32,
      value: 255,
      metaData: '',
    },
    textBold: {
      index: PropEnum.textBold,
      type: Type.Bool,
      value: false,
      metaData: '',
    },
    textLineStyle: {
      index: PropEnum.textLineStyle,
      type: Type.Int8,
      value: 0,
      metaData: '',
    },
    borderRadius: {
      index: PropEnum.borderRadius,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    borderStyle: {
      index: PropEnum.borderStyle,
      type: Type.Int8,
      value: 0,
      metaData: '',
    },
    paddingLeft: {
      index: PropEnum.paddingLeft,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    paddingTop: {
      index: PropEnum.paddingTop,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    paddingRight: {
      index: PropEnum.paddingRight,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    paddingBottom: {
      index: PropEnum.paddingBottom,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    marginLeft: {
      index: PropEnum.marginLeft,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    marginTop: {
      index: PropEnum.marginTop,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    marginRight: {
      index: PropEnum.marginRight,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    marginBottom: {
      index: PropEnum.marginBottom,
      type: Type.Int32,
      value: 0,
      metaData: '',
    },
    dock: {
      index: PropEnum.dock,
      type: Type.Int8,
      value: 0,
      metaData: '',
    },
    enable: {
      index: PropEnum.enable,
      type: Type.Bool,
      value: true,
      metaData: '',
    },
    click: {
      index: PropEnum.click,
      type: Type.Event,
      value: '',
      metaData: '',
    },
    contextmenu: {
      index: PropEnum.contextmenu,
      type: Type.Event,
      value: '',
      metaData: '',
    },
    dblclick: {
      index: PropEnum.dblclick,
      type: Type.Event,
      value: '',
      metaData: '',
    },
    keydown: {
      index: PropEnum.keydown,
      type: Type.Event,
      value: '',
      metaData: '',
    },
    keyup: {
      index: PropEnum.keyup,
      type: Type.Event,
      value: '',
      metaData: '',
    },
    'pointer.down': {
      index: PropEnum['pointer.down'],
      type: Type.Event,
      value: '',
      metaData: '',
    },
    'pointer.up': {
      index: PropEnum['pointer.up'],
      type: Type.Event,
      value: '',
      metaData: '',
    },
    'pointer.move': {
      index: PropEnum['pointer.move'],
      type: Type.Event,
      value: '',
      metaData: '',
    },
    'pointer.enter': {
      index: PropEnum['pointer.enter'],
      type: Type.Event,
      value: '',
      metaData: '',
    },
    'pointer.leave': {
      index: PropEnum['pointer.leave'],
      type: Type.Event,
      value: '',
      metaData: '',
    },
    'pointer.hover': {
      index: PropEnum['pointer.hover'],
      type: Type.Event,
      value: '',
      metaData: '',
    },
    wheel: {
      index: PropEnum.wheel,
      type: Type.Event,
      value: '',
      metaData: '',
    },
  } as IProperties;
}
