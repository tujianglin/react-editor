import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { $ } from '@/utils';
import { ColorPicker, Flex, Form, Input, InputNumber, Select, Slider, Switch } from 'antd';
import { observer } from 'mobx-react';
import { DraggableRequestParam } from 'react-moveable';

const Common = observer(({ id, properties, pid, type, name, lock }: LayerItem) => {
  const { moveableRef } = eventStore!;
  const { updateCurLayer } = editorStore!;
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Form.Item label={'名称'}>
        <Flex align="center">
          <Input value={name} onChange={(e) => updateCurLayer({ id, name: e.target.value })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'锁定'}>
        <Flex align="center">
          <Switch
            value={lock}
            onChange={(e) => {
              if (e) {
                updateCurLayer({ id, lock: e, directions: [], edge: [] });
              } else {
                // 取消锁定, 删除停靠逻辑
                updateCurLayer({ id, lock: e, directions: true, edge: true, properties: { dock: { value: 0 } } });
              }
            }}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'ID'}>
        <Flex align="center">
          <Input value={properties.name.value} disabled />
        </Flex>
      </Form.Item>
      <Form.Item label={'启用'}>
        <Flex align="center">
          <GlobalTreeSelect field="enable" />
          <Switch value={properties.enable.value} onChange={(e) => updateCurLayer({ id, properties: { enable: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'宽度'}>
        <Flex align="center">
          <GlobalTreeSelect field="width" />
          <InputNumber
            className="w-full"
            value={properties.width.value}
            disabled={type === 'Window'}
            onChange={(e) => {
              updateCurLayer({ id, properties: { width: { value: Math.round(e) } } });
              moveableRef!.request('draggable', { width: Math.round(e) }, true);
            }}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'高度'}>
        <Flex align="center">
          <GlobalTreeSelect field="height" />
          <InputNumber
            className="w-full"
            value={properties.height.value}
            disabled={type === 'Window'}
            onChange={(e) => {
              updateCurLayer({ id, properties: { height: { value: Math.round(e) } } });
              moveableRef!.request('draggable', { height: Math.round(e) }, true);
            }}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'X坐标'}>
        <Flex align="center">
          <GlobalTreeSelect field="x" />
          <InputNumber className="w-full" value={properties.x.value} onChange={(e) => updateCurLayer({ id, properties: { x: { value: Math.round(e) } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'Y坐标'}>
        <Flex align="center">
          <GlobalTreeSelect field="y" />
          <InputNumber className="w-full" value={properties.y.value} onChange={(e) => updateCurLayer({ id, properties: { y: { value: Math.round(e) } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'Z坐标'}>
        <Flex align="center">
          <GlobalTreeSelect field="z" />
          <InputNumber className="w-full" value={properties.z.value} onChange={(e) => updateCurLayer({ id, properties: { z: { value: Math.round(e) } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'可见性'}>
        <Flex align="center">
          <GlobalTreeSelect field="visibility" />
          <Select
            options={[
              { label: '隐藏', value: 0 },
              { label: '可见', value: 1 },
              { label: '无', value: 2 },
            ]}
            value={properties.visibility.value}
            onChange={(e) => updateCurLayer({ id, properties: { visibility: { value: e } } })}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'透明度'}>
        <Flex align="center">
          <GlobalTreeSelect field="opacity" />
          <Slider className="flex-1" min={0} max={1} step={0.1} value={properties.opacity.value} onChange={(e) => updateCurLayer({ id, properties: { opacity: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'背景图'}>
        <Flex align="center">
          <GlobalTreeSelect field="backgroundImageSrc" />
          <Input value={properties.backgroundImageSrc.value} onChange={(e) => updateCurLayer({ id, properties: { backgroundImageSrc: { value: e.target.value } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'背景图索引'}>
        <Flex align="center">
          <GlobalTreeSelect field="backgroundImageIndex" />
          <InputNumber
            className="w-full"
            value={properties.backgroundImageIndex.value}
            onChange={(e) => updateCurLayer({ id, properties: { backgroundImageIndex: { value: e } } })}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'背景图样式'}>
        <Flex align="center">
          <GlobalTreeSelect field="backgroundImageLayout" />
          <Select
            options={[
              { label: '直接缩放', value: 0 },
              { label: '等比缩放', value: 1 },
              { label: '平铺', value: 2 },
              { label: '居中', value: 3 },
            ]}
            value={properties.backgroundImageLayout.value}
            onChange={(e) => updateCurLayer({ id, properties: { backgroundImageLayout: { value: e } } })}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'背景颜色'}>
        <Flex align="center">
          <GlobalTreeSelect field="backgroundColor" />
          <ColorPicker
            showText
            allowClear
            value={properties.backgroundColor?.value}
            onChange={(e) => updateCurLayer({ id, properties: { backgroundColor: { value: e.toHex() } } })}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'字体大小'}>
        <Flex align="center">
          <GlobalTreeSelect field="fontSize" />
          <InputNumber className="w-full" value={properties.fontSize.value} onChange={(e) => updateCurLayer({ id, properties: { fontSize: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'字体'}>
        <Flex align="center">
          <GlobalTreeSelect field="fontFamily" />
          <Input value={properties.fontFamily.value} onChange={(e) => updateCurLayer({ id, properties: { fontFamily: { value: e.target.value } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'文本颜色'}>
        <Flex align="center">
          <GlobalTreeSelect field="textColor" />
          <ColorPicker
            showText
            allowClear
            value={properties.textColor?.value}
            onChange={(e) => {
              updateCurLayer({ id, properties: { textColor: { value: e.toHex() } } });
            }}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'文本加粗'}>
        <Flex align="center">
          <GlobalTreeSelect field="textBold" />
          <Switch value={properties.textBold.value} onChange={(e) => updateCurLayer({ id, properties: { textBold: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'文本线样式'}>
        <Flex align="center">
          <GlobalTreeSelect field="textLineStyle" />
          <Select
            options={[
              { label: '无', value: 0 },
              { label: '下划线', value: 1 },
              { label: '删除线', value: 2 },
              { label: '上划线', value: 3 },
            ]}
            value={properties.textLineStyle.value}
            onChange={(e) => updateCurLayer({ id, properties: { textLineStyle: { value: e } } })}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'边框圆角'}>
        <Flex align="center">
          <GlobalTreeSelect field="borderRadius" />
          <InputNumber className="w-full" value={properties.borderRadius.value} onChange={(e) => updateCurLayer({ id, properties: { borderRadius: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'边框样式'}>
        <Flex align="center">
          <GlobalTreeSelect field="borderStyle" />
          <Select
            options={[
              { label: '无', value: 0 },
              { label: '3D', value: 1 },
              { label: '平面', value: 2 },
            ]}
            value={properties.borderStyle.value}
            onChange={(e) => updateCurLayer({ id, properties: { borderStyle: { value: e } } })}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'左内边距'}>
        <Flex align="center">
          <GlobalTreeSelect field="paddingLeft" />
          <InputNumber className="w-full" value={properties.paddingLeft.value} onChange={(e) => updateCurLayer({ id, properties: { paddingLeft: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'上内边距'}>
        <Flex align="center">
          <GlobalTreeSelect field="paddingTop" />
          <InputNumber className="w-full" value={properties.paddingTop.value} onChange={(e) => updateCurLayer({ id, properties: { paddingTop: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'右内边距'}>
        <Flex align="center">
          <GlobalTreeSelect field="paddingRight" />
          <InputNumber className="w-full" value={properties.paddingRight.value} onChange={(e) => updateCurLayer({ id, properties: { paddingRight: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'下内边距'}>
        <Flex align="center">
          <GlobalTreeSelect field="paddingBottom" />
          <InputNumber className="w-full" value={properties.paddingBottom.value} onChange={(e) => updateCurLayer({ id, properties: { paddingBottom: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'左外边距'}>
        <Flex align="center">
          <GlobalTreeSelect field="marginLeft" />
          <InputNumber className="w-full" value={properties.marginLeft.value} onChange={(e) => updateCurLayer({ id, properties: { marginLeft: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'上外边距'}>
        <Flex align="center">
          <GlobalTreeSelect field="marginTop" />
          <InputNumber className="w-full" value={properties.marginTop.value} onChange={(e) => updateCurLayer({ id, properties: { marginTop: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'右外边距'}>
        <Flex align="center">
          <GlobalTreeSelect field="marginRight" />
          <InputNumber className="w-full" value={properties.marginRight.value} onChange={(e) => updateCurLayer({ id, properties: { marginRight: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'下外边距'}>
        <Flex align="center">
          <GlobalTreeSelect field="marginBottom" />
          <InputNumber className="w-full" value={properties.marginBottom.value} onChange={(e) => updateCurLayer({ id, properties: { marginBottom: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'停靠'}>
        <Flex align="center">
          <GlobalTreeSelect field="dock" />
          <Select
            options={[
              { label: '无', value: 0 },
              { label: '上停靠', value: 1 },
              { label: '左停靠', value: 2 },
              { label: '右停靠', value: 3 },
              { label: '下停靠', value: 4 },
              { label: '填充父级', value: 5 },
            ]}
            value={properties.dock.value}
            onChange={(e) => {
              if (!pid) return;
              updateCurLayer({ id, properties: { dock: { value: e } } });
              switch (e) {
                // 上停靠
                case 1: {
                  const width = $(`#${pid}`).offsetWidth;
                  moveableRef!.request<DraggableRequestParam>('draggable', { width }, true);
                  updateCurLayer({
                    id,
                    directions: ['s'],
                    edge: ['s'],
                    lock: true,
                    properties: {
                      y: { value: 0 },
                      x: { value: 0 },
                      width: { value: width },
                    },
                  });
                  break;
                }
                case 2: {
                  const height = $(`#${pid}`).offsetHeight;
                  moveableRef!.request<DraggableRequestParam>('draggable', { height }, true);
                  updateCurLayer({
                    id,
                    directions: ['e'],
                    edge: ['e'],
                    lock: true,
                    properties: {
                      x: { value: 0 },
                      y: { value: 0 },
                      height: { value: height },
                    },
                  });
                  break;
                }
                case 3: {
                  const rect = moveableRef!.getRect();
                  const height = $(`#${pid}`).offsetHeight;
                  moveableRef!.request<DraggableRequestParam>('draggable', { height }, true);
                  updateCurLayer({
                    id,
                    directions: ['w'],
                    edge: ['w'],
                    lock: true,
                    properties: {
                      x: { value: Math.round($(`#${pid}`).offsetWidth || 0) - rect.width },
                      y: { value: 0 },
                      height: { value: height },
                    },
                  });
                  break;
                }
                case 4: {
                  const rect = moveableRef!.getRect();
                  const width = $(`#${pid}`).offsetWidth;
                  moveableRef!.request<DraggableRequestParam>('draggable', { width }, true);
                  updateCurLayer({
                    id,
                    directions: ['n'],
                    edge: ['n'],
                    lock: true,
                    properties: {
                      y: { value: Math.round($(`#${pid}`).offsetHeight || 0) - rect.height },
                      x: { value: 0 },
                      width: { value: width },
                    },
                  });
                  break;
                }
                case 5: {
                  const width = $(`#${pid}`).offsetWidth;
                  const height = $(`#${pid}`).offsetHeight;
                  moveableRef!.request<DraggableRequestParam>('draggable', { width, height }, true);
                  updateCurLayer({
                    id,
                    directions: [],
                    edge: [],
                    lock: true,
                    properties: {
                      width: { value: width },
                      height: { value: height },
                      x: { value: 0 },
                      y: { value: 0 },
                    },
                  });
                  break;
                }
                default:
                  break;
              }
            }}
          />
        </Flex>
      </Form.Item>
    </Form>
  );
});
export default Common;
