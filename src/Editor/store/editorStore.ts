import { BaseInfo, ISystem, LayerItem } from '@/packages/types/component';
import { treeForEach } from '@/utils/tree';
import { isEqual, merge } from 'lodash-es';
import { makeAutoObservable } from 'mobx';
import { images } from '../components/LeftPanel/components/a';
import EditorLoader from '../loader/EditorLoader';
import eventStore from './eventStore';
class EditorStore {
  componentList: BaseInfo[] = [];
  layerList: LayerItem[] = JSON.parse(localStorage.getItem('layerList')) || [];
  curLayer: LayerItem = null;
  system: ISystem = {
    name: '',
    width: 800,
    height: 600,
  };
  /** 全局数据源 */
  globalData: any = [];
  /** 资源数据区 */
  resourceData = [
    { type: 1, name: '图片', children: images },
    { type: 2, name: '音频', children: [] },
    { type: 3, name: '视频', children: [] },
    { type: 4, name: '文本', children: [] },
    { type: 5, name: '二进制', children: [] },
  ];
  constructor() {
    makeAutoObservable(this);
  }

  setComponentList = () => {
    const { definitionMap } = EditorLoader;
    const list = Object.values(definitionMap).map((def) => def.getBaseInfo());
    this.componentList = list.sort((a, b) => a.order - b.order);
  };

  addLayer = (layer: LayerItem) => {
    if (layer.pid) {
      treeForEach(this.layerList, (i) => {
        if (i.id === layer.pid) i.children.push(layer);
      });
    } else {
      this.layerList.push(layer);
    }
  };
  setCurLayer = (layer: LayerItem) => {
    if (!layer) {
      this.curLayer = null;
      return;
    }
    treeForEach(this.layerList, (i) => {
      if (i.id === layer.id) {
        this.curLayer = i;
      }
    });
  };
  updateCurLayer = <T>(props: Partial<LayerItem<T>>) => {
    if (props.id !== this.curLayer.id) return;
    this.curLayer = merge(this.curLayer, props);
  };
  updateLayer = (items: Partial<LayerItem>[]) => {
    treeForEach(this.layerList, (i) => {
      items.map((ii) => {
        if (i.id === ii.id && !isEqual(i.properties, ii.properties)) {
          i.properties = merge(i.properties, ii.properties);
        }
      });
    });
  };
  updateSystem = (props: ISystem) => {
    this.system = merge(this.system, props);
  };

  setLayerList = () => {
    this.layerList = JSON.parse(localStorage.getItem('layerList')) || [];
  };
  deleteLayer = () => {
    // 如果是window 组件并没有父级,说明在最上层直接filter 过滤
    if (this.curLayer?.type === 'Window' && !this.curLayer?.pid) {
      this.layerList = this.layerList.filter((i) => i.id !== this.curLayer.id);
    } else {
      treeForEach(this.layerList, (i) => {
        if (i.id === this.curLayer?.pid) {
          i.children = i.children.filter((ii) => ii.id !== this.curLayer.id);
        }
      });
    }
    this.setCurLayer(null);
    const { setSelectedTargets } = eventStore;
    setSelectedTargets([]);
  };

  getGlobalData = () => {
    fetch((window as any).apiUrl)
      .then((res) => res.json())
      .then((res) => {
        this.globalData = [res.data];
      });
  };
}

export default new EditorStore();
