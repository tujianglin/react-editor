import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { Divider, Flex, Form, Select } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { IImageView } from './default';

const ImageViewConfig = observer(({ properties, id }: LayerItem<IImageView>) => {
  const [srcList, setSrcList] = useState([]);
  useEffect(() => {
    const child = editorStore.resourceData.find((i) => i.name === properties.imgSource.value)?.children;
    const list = child?.map((i, index) => ({ label: i, value: index }));
    setSrcList(list || []);
  }, [properties.imgSource.value]);
  const { updateCurLayer } = editorStore!;
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Divider className="!mt-0">属性</Divider>
      <Form.Item label={'图标所属组'}>
        <Flex align="center">
          <GlobalTreeSelect field="imgSource" />
          <Select
            value={properties.imgSource.value}
            options={editorStore.resourceData}
            fieldNames={{ label: 'name', value: 'name' }}
            onChange={(e) => {
              updateCurLayer<IImageView>({ id, properties: { imgSource: { value: e } } });
            }}
          />
        </Flex>
      </Form.Item>
      <Form.Item label={'图标索引'}>
        <Flex align="center">
          <GlobalTreeSelect field="imgIndex" />
          <Select value={properties.imgIndex.value} options={srcList} onChange={(e) => updateCurLayer<IImageView>({ id, properties: { imgIndex: { value: e } } })} />
        </Flex>
      </Form.Item>
      <Divider>事件</Divider>
    </Form>
  );
});

export default ImageViewConfig;
