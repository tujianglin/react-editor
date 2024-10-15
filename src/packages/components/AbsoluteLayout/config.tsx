import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { Divider, Flex, Form, Switch } from 'antd';
import { observer } from 'mobx-react';
import { IAbsoluteLayout } from './default';

const AbsoluteLayoutConfig = observer(({ id, properties }: LayerItem<IAbsoluteLayout>) => {
  const { updateCurLayer } = editorStore!;

  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Divider className="!mt-0">属性</Divider>
      <Form.Item label={'水平滚动条'}>
        <Flex align="center">
          <GlobalTreeSelect field="hScroll" />
          <Switch value={properties.hScroll.value} onChange={(e) => updateCurLayer<IAbsoluteLayout>({ id, properties: { hScroll: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'垂直滚动条'}>
        <Flex align="center">
          <GlobalTreeSelect field="vScroll" />
          <Switch value={properties.vScroll.value} onChange={(e) => updateCurLayer<IAbsoluteLayout>({ id, properties: { vScroll: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'对齐方式'}>
        <Flex align="center">
          <GlobalTreeSelect field="layoutAlignment" />
        </Flex>
      </Form.Item>
      <Divider>事件</Divider>
    </Form>
  );
});

export default AbsoluteLayoutConfig;
