import { LayerItem } from '@/packages/types/component';
import { $, generateID } from '@/utils';
import { treeForEach } from '@/utils/tree';
import { message } from 'antd';
import { cloneDeep } from 'lodash-es';
import { makeAutoObservable } from 'mobx';
import editorStore from './editorStore';
import eventStore from './eventStore';

class ContextMenuStore {
  /** 右键菜单显示状态 */
  visible = false;
  /** 右键菜单位置 */
  position: [number, number] = [0, 0];
  pointPos = [0, 0];
  copyData: LayerItem = null;
  constructor() {
    makeAutoObservable(this);
  }

  updateVisible = (visible: boolean) => (this.visible = visible);

  setPosition = (position: [number, number]) => (this.position = position);

  sepPointPos = ({ e, pid }) => {
    const rectInfo = $(`#${pid}`).getBoundingClientRect();
    const x = Math.round(e.clientX - rectInfo.x);
    const y = Math.round(e.clientY - rectInfo.y);
    this.pointPos = [x, y];
  };

  /** 复制 */
  onCopy = () => {
    const { curLayer } = editorStore;
    this.copyData = cloneDeep(curLayer);
    this.visible = false;
  };
  /** 粘贴 */
  onPaste = () => {
    if (!this.copyData) {
      message.warning('请先复制组件');
      this.visible = false;
      return;
    }
    const { addLayer } = editorStore;
    const { zoom } = eventStore!;
    const tree = [cloneDeep(this.copyData)];
    treeForEach(tree, (i) => {
      i.id = generateID();
      i.properties.name.value = generateID();
    });
    const com = tree[0] as LayerItem;
    com.properties.x.value = Math.round(this.pointPos[0] / zoom);
    com.properties.y.value = Math.round(this.pointPos[1] / zoom);
    addLayer(com);
    this.visible = false;
  };
  /** 删除 */
  onDelete = () => {
    const { deleteLayer } = editorStore;
    deleteLayer();
    this.visible = false;
  };
  /** 锁定 */
  onLock = () => {
    const { updateCurLayer, curLayer } = editorStore;
    updateCurLayer({ id: curLayer.id, lock: false, directions: true, edge: true, properties: { dock: { value: 0 } } });
    this.visible = false;
  };
  /** 解锁 */
  onUnLock = () => {
    const { updateCurLayer, curLayer } = editorStore;
    updateCurLayer({ id: curLayer.id, lock: true, directions: [], edge: [] });
    this.visible = false;
  };
}

export default new ContextMenuStore();
