import Guides from '@scena/react-guides';
import { makeAutoObservable } from 'mobx';
import InfiniteViewer from 'react-infinite-viewer';
import Moveable from 'react-moveable';
import Selecto from 'react-selecto';

class EventStore {
  zoom = 1;
  horizontalGuidesRef: Guides = null;
  verticalGuidesRef: Guides = null;
  selectoRef: Selecto = null;
  infiniteViewerRef: InfiniteViewer = null;
  moveableRef: Moveable = null;
  selectedTargets: HTMLElement[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  setZoom = (zoom) => (this.zoom = zoom);
  setHorizontalGuidesRef = (ref) => (this.horizontalGuidesRef = ref);
  setVerticalGuidesRef = (ref) => (this.verticalGuidesRef = ref);
  setSelectoRef = (ref) => (this.selectoRef = ref);
  setInfiniteViewerRef = (ref) => (this.infiniteViewerRef = ref);
  setMoveableRef = (ref) => (this.moveableRef = ref);
  setSelectedTargets = (targets) => (this.selectedTargets = targets);
}

export default new EventStore();
