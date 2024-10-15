import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { treeForEach } from '@/utils/tree';
import { Divider, Flex, Form, Select, Switch } from 'antd';
import { observer } from 'mobx-react';
import { IHorizontalLayout } from './default';

const HorizontalLayoutConfig = observer(({ properties, id }: LayerItem<IHorizontalLayout>) => {
  const { updateCurLayer, layerList } = editorStore!;
  const list = [];
  treeForEach(layerList, (i) => {
    if (i.pid === id) {
      list.push({ label: i.name, value: i.properties.name.value, id: i.id });
    }
  });
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Divider className="!mt-0">属性</Divider>
      <Form.Item label={'水平滚动条'}>
        <Flex align="center">
          <GlobalTreeSelect field="hScroll" />
          <Switch value={properties.hScroll.value} onChange={(e) => updateCurLayer<IHorizontalLayout>({ id, properties: { hScroll: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'垂直滚动条'}>
        <Flex align="center">
          <GlobalTreeSelect field="vScroll" />
          <Switch value={properties.vScroll.value} onChange={(e) => updateCurLayer<IHorizontalLayout>({ id, properties: { vScroll: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'是否换行'}>
        <Flex align="center">
          <GlobalTreeSelect field="wrap" />
          <Switch value={properties.wrap.value} onChange={(e) => updateCurLayer<IHorizontalLayout>({ id, properties: { wrap: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'对齐方式'}>
        <Flex align="center">
          <GlobalTreeSelect field="layoutAlignment" />
          <Select
            value={properties.layoutAlignment.value}
            options={[
              { label: '顶端对齐', value: 0 },
              { label: '底端对其', value: 1 },
              { label: '居中对齐', value: 2 },
            ]}
            onChange={(e) => updateCurLayer<IHorizontalLayout>({ id, properties: { layoutAlignment: { value: e } } })}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'填充元素'}>
        <Flex align="center">
          <GlobalTreeSelect field="fillItem" />
          <Select value={properties.fillItem.value} allowClear options={list} onSelect={(e) => updateCurLayer({ id, properties: { fillItem: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Divider>事件</Divider>
    </Form>
  );
});

export default HorizontalLayoutConfig;
