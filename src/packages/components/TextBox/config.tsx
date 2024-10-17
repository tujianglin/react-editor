import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { Divider, Form, Input, Select, Switch } from 'antd';
import { observer } from 'mobx-react';
import { ITextBox } from './default';

const TextBoxConfig = observer(({ properties, id }: LayerItem<ITextBox>) => {
  const { updateCurLayer } = editorStore!;
  return (
    <div>
      <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
        <Divider className="!mt-0">属性</Divider>
        <Form.Item label={'文本内容'}>
          <GlobalTreeSelect field="value">
            <Input value={properties.value.value} onChange={(e) => updateCurLayer<ITextBox>({ id, properties: { value: { value: e.target.value } } })} />
          </GlobalTreeSelect>
        </Form.Item>
        <Form.Item label={'占位符文本'}>
          <GlobalTreeSelect field="placeholderText">
            <Input value={properties.placeholderText.value} onChange={(e) => updateCurLayer<ITextBox>({ id, properties: { placeholderText: { value: e.target.value } } })} />
          </GlobalTreeSelect>
        </Form.Item>
        <Form.Item label={'输入框类型'}>
          <GlobalTreeSelect field="type">
            <Select
              value={properties.type.value}
              options={[
                { label: '数字输入', value: 1 },
                { label: '数字、点（.)、正负输入', value: 2 },
                { label: '任意字符输入', value: 3 },
                { label: '密码输入', value: 4 },
              ]}
              onChange={(e) => updateCurLayer<ITextBox>({ id, properties: { type: { value: e } } })}
            />
          </GlobalTreeSelect>
        </Form.Item>
        <Form.Item label={'只读'}>
          <GlobalTreeSelect field="readOnly">
            <Switch value={properties.readOnly.value} onChange={(e) => updateCurLayer<ITextBox>({ id, properties: { readOnly: { value: e } } })} />
          </GlobalTreeSelect>
        </Form.Item>
        <Divider>事件</Divider>
        <Form.Item label={'changed'}>
          <GlobalTreeSelect field="changed">
            <Input value={properties.changed.value} onChange={(e) => updateCurLayer<ITextBox>({ id, properties: { changed: { value: e.target.value } } })} />
          </GlobalTreeSelect>
        </Form.Item>
      </Form>
    </div>
  );
});

export default TextBoxConfig;
