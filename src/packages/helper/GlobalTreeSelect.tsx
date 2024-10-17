import editorStore from '@/Editor/store/editorStore';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Tooltip, TreeSelect } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { Type } from '../types/component';

interface IProps {
  field: string;
  children?: React.ReactNode;
}

const GlobalTreeSelect = observer(({ field, children }: IProps) => {
  const { curLayer, updateCurLayer, globalData } = editorStore!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('');

  const onClick = () => {
    setValue(curLayer?.properties?.[field].metaData);
    setIsModalOpen(true);
  };
  const onChange = (val) => {
    setValue(val);
  };

  const onOk = () => {
    updateCurLayer({
      id: curLayer.id,
      properties: {
        [field]: {
          metaData: value,
          type: Type.Source,
        },
      },
    });
    setIsModalOpen(false);
  };

  useEffect(() => {}, []);
  return (
    <Flex align="center">
      <Tooltip title="绑定元数据">
        <Button className="mr-2" type="primary" ghost={curLayer?.properties?.[field]?.metaData ? false : true} onClick={onClick}>
          <PlusOutlined />
        </Button>
      </Tooltip>
      {children && <div className="!w-0 flex-1">{children}</div>}
      <Modal title="绑定元数据" open={isModalOpen} centered onCancel={() => setIsModalOpen(false)} onOk={onOk} destroyOnClose>
        <TreeSelect
          className="w-full"
          placeholder={'请绑定元数据'}
          value={value}
          showSearch
          treeNodeFilterProp="name"
          treeData={globalData}
          fieldNames={{ label: 'name', value: 'id' }}
          onChange={onChange}
        />
      </Modal>
    </Flex>
  );
});
export default GlobalTreeSelect;
