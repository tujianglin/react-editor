import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { Divider, Form, Input, Switch } from 'antd';
import { observer } from 'mobx-react';
import { IMultilineTextBox } from './default';

const MultilineTextBoxConfig = observer(({ id, properties }: LayerItem<IMultilineTextBox>) => {
  const { updateCurLayer } = editorStore!;

  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Divider className="!mt-0">属性</Divider>
      <Form.Item label={'文本内容'}>
        <GlobalTreeSelect field="value">
          <Input value={properties.value.value} onChange={(e) => updateCurLayer<IMultilineTextBox>({ id, properties: { value: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'占位符文本'}>
        <GlobalTreeSelect field="placeholderText">
          <Input value={properties.placeholderText.value} onChange={(e) => updateCurLayer<IMultilineTextBox>({ id, properties: { placeholderText: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'只读'}>
        <GlobalTreeSelect field="readOnly">
          <Switch value={properties.readOnly.value} onChange={(e) => updateCurLayer<IMultilineTextBox>({ id, properties: { readOnly: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Divider>事件</Divider>
      <Form.Item label={'changed'}>
        <GlobalTreeSelect field="changed">
          <Input value={properties.changed.value} onChange={(e) => updateCurLayer<IMultilineTextBox>({ id, properties: { changed: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
    </Form>
  );
});

export default MultilineTextBoxConfig;
