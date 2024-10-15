import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { Divider, Flex, Form, Input, InputNumber, Switch } from 'antd';
import { observer } from 'mobx-react';
import { IMyWindow } from './default';

const WindowConfig = observer(({ id, properties }: LayerItem<IMyWindow>) => {
  const { updateCurLayer } = editorStore!;
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Divider className="!mt-0">属性</Divider>
      <Form.Item label={'水平滚动条'}>
        <Flex align="center">
          <GlobalTreeSelect field="hScroll" />
          <Switch value={properties['hScroll'].value} onChange={(e) => updateCurLayer<IMyWindow>({ id, properties: { hScroll: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'垂直滚动条'}>
        <Flex align="center">
          <GlobalTreeSelect field="vScroll" />
          <Switch value={properties['vScroll'].value} onChange={(e) => updateCurLayer<IMyWindow>({ id, properties: { vScroll: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'暂无使用'}>
        <Flex align="center">
          <GlobalTreeSelect field="layoutAlignment" />
        </Flex>
      </Form.Item>
      <Form.Item label={'标题'}>
        <Flex align="center">
          <GlobalTreeSelect field="Title" />
          <Input value={properties.Title.value} onChange={(e) => updateCurLayer<IMyWindow>({ id, properties: { Title: { value: e.target.value } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'图标所属组'}>
        <Flex align="center">
          <GlobalTreeSelect field="IconSrcGroup" />
          <Input value={properties.IconSrcGroup.value} onChange={(e) => updateCurLayer<IMyWindow>({ id, properties: { IconSrcGroup: { value: e.target.value } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'图标索引'}>
        <Flex align="center">
          <GlobalTreeSelect field="IconScrIndex" />
          <InputNumber className="w-full" value={properties.IconScrIndex.value} onChange={(e) => updateCurLayer<IMyWindow>({ id, properties: { IconScrIndex: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Divider>事件</Divider>

      <Form.Item label={'show'}>
        <Flex align="center">
          <GlobalTreeSelect field="window.show" />
          <Input value={properties['window.show'].value} onChange={(e) => updateCurLayer<IMyWindow>({ id, properties: { 'window.show': { value: e.target.value } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'close'}>
        <Flex align="center">
          <GlobalTreeSelect field="window.close" />
          <Input value={properties['window.close'].value} onChange={(e) => updateCurLayer<IMyWindow>({ id, properties: { 'window.close': { value: e.target.value } } })} />
        </Flex>
      </Form.Item>
    </Form>
  );
});

export default WindowConfig;
