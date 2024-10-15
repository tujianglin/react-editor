import EditorLoader from '@/Editor/loader/EditorLoader';
import contextmenuStore from '@/Editor/store/contextmenuStore';
import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { DynamicComponent } from '@/packages/helper/DynamicComponent';
import { LayerItem } from '@/packages/types/component';
import { getFlowLayerStyle, getWindowStyle } from '@/packages/utils/style';
import { $ } from '@/utils';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { CSSProperties, Fragment } from 'react';
import { IHorizontalLayout } from './default';

const HorizontalLayout = observer(({ id, properties, children }: LayerItem<IHorizontalLayout>) => {
  const { setCurLayer, addLayer } = editorStore!;
  const { zoom, setSelectedTargets, selectedTargets } = eventStore!;
  const { updateVisible } = contextmenuStore!;

  const onDrop = (event: React.DragEvent) => {
    const e = event.nativeEvent;
    event.preventDefault();
    event.stopPropagation();
    const type = e.dataTransfer?.getData('type');
    const rectInfo = $(`#viewport-${id}`).getBoundingClientRect();
    const com = EditorLoader.definitionMap[type].getInitConfig() as LayerItem;
    if (!type) return;
    const w = com.properties.width.value * zoom;
    const h = com.properties.height.value * zoom;
    com.properties.x.value = Math.round((e.clientX - rectInfo.x - w / 2) / zoom);
    com.properties.y.value = Math.round((e.clientY - rectInfo.y - h / 2) / zoom);
    com.pid = id;
    com.lock = true;
    addLayer(com);
  };

  const onMouseDown = (e: React.MouseEvent, layer: LayerItem) => {
    e.stopPropagation();
    updateVisible(false);
    const targets = [];
    // 容器内组件多选定义
    selectedTargets.map((i) => {
      if (i?.classList?.contains(id)) {
        targets.push(i);
      }
    });
    if (!targets.length) {
      setSelectedTargets([$(`#${layer.id}`)]);
    } else {
      setSelectedTargets(targets);
    }
    setCurLayer(layer);
  };

  const style = () => {
    const result = {
      ...getWindowStyle(properties),
      display: 'flex',
      alignItems: properties.layoutAlignment.value === 0 ? 'flex-start' : properties.layoutAlignment.value === 1 ? 'flex-end' : 'center',
      flexWrap: properties.wrap.value ? 'wrap' : 'nowrap',
    } as CSSProperties;
    return result;
  };
  return (
    <div
      id={`viewport-${id}`}
      className="shadow-sm"
      style={style()}
      onDrop={onDrop}
      onMouseDown={() => {
        updateVisible(false);
      }}
    >
      {children.map((i) => (
        <Fragment key={i.id}>
          <div id={i.id} className={classNames('layer-item', i.pid)} style={getFlowLayerStyle(i)} onMouseDown={(e) => onMouseDown(e, i)}>
            <DynamicComponent is={i.type} {...i} />
          </div>
        </Fragment>
      ))}
    </div>
  );
});

export default HorizontalLayout;
