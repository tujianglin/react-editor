import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { Divider, Flex, Form, Input, InputNumber, Select, Switch } from 'antd';
import { observer } from 'mobx-react';
import { ILabel } from './default';

const LabelConfig = observer(({ properties, id }: LayerItem<ILabel>) => {
  const { updateCurLayer } = editorStore!;
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Divider className="!mt-0">属性</Divider>
      <Form.Item label={'文本内容'}>
        <Flex align="center">
          <GlobalTreeSelect field="textContent" />
          <Input value={properties.textContent.value} onChange={(e) => updateCurLayer<ILabel>({ id, properties: { textContent: { value: e.target.value } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'链接地址'}>
        <Flex align="center">
          <GlobalTreeSelect field="linkUrl" />
          <Input value={properties.linkUrl.value} onChange={(e) => updateCurLayer<ILabel>({ id, properties: { linkUrl: { value: e.target.value } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'尺寸自适应'}>
        <Flex align="center">
          <GlobalTreeSelect field="autoSize" />
          <Switch value={properties.autoSize.value} onChange={(e) => updateCurLayer<ILabel>({ id, properties: { autoSize: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'行高'}>
        <Flex align="center">
          <GlobalTreeSelect field="lineHeight" />
          <InputNumber value={properties.lineHeight.value} onChange={(e) => updateCurLayer<ILabel>({ id, properties: { lineHeight: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'换行'}>
        <Flex align="center">
          <GlobalTreeSelect field="textWrap" />
          <Switch value={properties.textWrap.value} onChange={(e) => updateCurLayer<ILabel>({ id, properties: { textWrap: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Form.Item label={'对齐方式'}>
        <Flex align="center">
          <GlobalTreeSelect field="textAlign" />
          <Select
            value={properties.textAlign.value}
            options={[
              { label: '左对齐', value: 0 },
              { label: '右对齐', value: 1 },
              { label: '居中对齐', value: 2 },
              { label: '两端对齐', value: 3 },
            ]}
            onChange={(e) => updateCurLayer<ILabel>({ id, properties: { textAlign: { value: e } } })}
          />
        </Flex>
      </Form.Item>
      <Divider>事件</Divider>
    </Form>
  );
});

export default LabelConfig;
