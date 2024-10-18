import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { Divider, Form, Input, InputNumber } from 'antd';
import { observer } from 'mobx-react';
import { IButton } from './default';

const ButtonConfig = observer(({ properties, id }: LayerItem<IButton>) => {
  const { updateCurLayer } = editorStore!;
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Divider className="!mt-0">属性</Divider>
      <Form.Item label={'文本内容'}>
        <GlobalTreeSelect field="text">
          <Input value={properties.text.value} onChange={(e) => updateCurLayer<IButton>({ id, properties: { text: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'资源组'}>
        <GlobalTreeSelect field="iconSource">
          <Input value={properties.iconSource.value} onChange={(e) => updateCurLayer<IButton>({ id, properties: { iconSource: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'资源索引'}>
        <GlobalTreeSelect field="iconIndex">
          <InputNumber value={properties.iconIndex.value} onChange={(e) => updateCurLayer<IButton>({ id, properties: { iconIndex: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'图标宽度'}>
        <GlobalTreeSelect field="iconWidth">
          <InputNumber value={properties.iconWidth.value} onChange={(e) => updateCurLayer<IButton>({ id, properties: { iconWidth: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'图标高度'}>
        <GlobalTreeSelect field="iconHeight">
          <InputNumber value={properties.iconHeight.value} onChange={(e) => updateCurLayer<IButton>({ id, properties: { iconHeight: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Divider>事件</Divider>
    </Form>
  );
});

export default ButtonConfig;
