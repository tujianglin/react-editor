import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { Form, Input } from 'antd';
import { observer } from 'mobx-react';

const CommonEvent = observer(({ id, properties }: LayerItem) => {
  const { updateCurLayer } = editorStore!;
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Form.Item label={'点击'}>
        <GlobalTreeSelect field="click">
          <Input value={properties.click.value} onChange={(e) => updateCurLayer({ id, properties: { click: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'右击'}>
        <GlobalTreeSelect field="contextmenu">
          <Input value={properties.contextmenu.value} onChange={(e) => updateCurLayer({ id, properties: { contextmenu: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'双击'}>
        <GlobalTreeSelect field="dblclick">
          <Input value={properties.dblclick.value} onChange={(e) => updateCurLayer({ id, properties: { dblclick: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'键盘按下'}>
        <GlobalTreeSelect field="keydown">
          <Input value={properties.keydown.value} onChange={(e) => updateCurLayer({ id, properties: { keydown: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'键盘抬起'}>
        <GlobalTreeSelect field="keyup">
          <Input value={properties.keyup.value} onChange={(e) => updateCurLayer({ id, properties: { keyup: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'光标按下'}>
        <GlobalTreeSelect field="pointer.down">
          <Input value={properties['pointer.down'].value} onChange={(e) => updateCurLayer({ id, properties: { 'pointer.down': { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'光标抬起'}>
        <GlobalTreeSelect field="pointer.up">
          <Input value={properties['pointer.up'].value} onChange={(e) => updateCurLayer({ id, properties: { 'pointer.up': { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'光标移动'}>
        <GlobalTreeSelect field="pointer.move">
          <Input value={properties['pointer.move'].value} onChange={(e) => updateCurLayer({ id, properties: { 'pointer.move': { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'光标进入'}>
        <GlobalTreeSelect field="pointer.enter">
          <Input value={properties['pointer.enter'].value} onChange={(e) => updateCurLayer({ id, properties: { 'pointer.enter': { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'光标离开'}>
        <GlobalTreeSelect field="pointer.leave">
          <Input value={properties['pointer.leave'].value} onChange={(e) => updateCurLayer({ id, properties: { 'pointer.leave': { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'光标悬停'}>
        <GlobalTreeSelect field="pointer.hover">
          <Input value={properties['pointer.hover'].value} onChange={(e) => updateCurLayer({ id, properties: { 'pointer.hover': { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'滚轮事件'}>
        <GlobalTreeSelect field="wheel">
          <Input value={properties.wheel.value} onChange={(e) => updateCurLayer({ id, properties: { wheel: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
    </Form>
  );
});
export default CommonEvent;
