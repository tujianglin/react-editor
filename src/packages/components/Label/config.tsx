import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { Divider, Form, Input, InputNumber, Select, Switch } from 'antd';
import { observer } from 'mobx-react';
import { ILabel } from './default';

const LabelConfig = observer(({ properties, id }: LayerItem<ILabel>) => {
  const { updateCurLayer } = editorStore!;
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Divider className="!mt-0">属性</Divider>
      <Form.Item label={'文本内容'}>
        <GlobalTreeSelect field="textContent">
          <Input value={properties.textContent.value} onChange={(e) => updateCurLayer<ILabel>({ id, properties: { textContent: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'链接地址'}>
        <GlobalTreeSelect field="linkUrl">
          <Input value={properties.linkUrl.value} onChange={(e) => updateCurLayer<ILabel>({ id, properties: { linkUrl: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'尺寸自适应'}>
        <GlobalTreeSelect field="autoSize">
          <Switch value={properties.autoSize.value} onChange={(e) => updateCurLayer<ILabel>({ id, properties: { autoSize: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'行高'}>
        <GlobalTreeSelect field="lineHeight">
          <InputNumber value={properties.lineHeight.value} onChange={(e) => updateCurLayer<ILabel>({ id, properties: { lineHeight: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'换行'}>
        <GlobalTreeSelect field="textWrap">
          <Switch value={properties.textWrap.value} onChange={(e) => updateCurLayer<ILabel>({ id, properties: { textWrap: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'对齐方式'}>
        <GlobalTreeSelect field="textAlign">
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
        </GlobalTreeSelect>
      </Form.Item>
      <Divider>事件</Divider>
    </Form>
  );
});

export default LabelConfig;
