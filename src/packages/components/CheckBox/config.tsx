import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { Divider, Form, Input, Switch } from 'antd';
import { observer } from 'mobx-react';
import { ICheckBox } from './default';

const CheckBoxConfig = observer(({ id, properties }: LayerItem<ICheckBox>) => {
  const { updateCurLayer } = editorStore!;

  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Divider className="!mt-0">属性</Divider>
      <Form.Item label={'文本内容'}>
        <GlobalTreeSelect field="textContent">
          <Input value={properties.textContent.value} onChange={(e) => updateCurLayer<ICheckBox>({ id, properties: { textContent: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'是否选中'}>
        <GlobalTreeSelect field="value">
          <Switch value={properties.value.value} onChange={(e) => updateCurLayer<ICheckBox>({ id, properties: { value: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Divider>事件</Divider>
      <Form.Item label={'changed'}>
        <GlobalTreeSelect field="changed">
          <Input value={properties.changed.value} onChange={(e) => updateCurLayer<ICheckBox>({ id, properties: { changed: { value: e.target.value } } })} />
        </GlobalTreeSelect>
      </Form.Item>
    </Form>
  );
});

export default CheckBoxConfig;
