import editorStore from '@/Editor/store/editorStore';
import { Button, Divider, Upload, UploadProps } from 'antd';
import { observer } from 'mobx-react';

const Resource = observer(() => {
  const { resourceData } = editorStore;
  const uploadProps: UploadProps = {
    showUploadList: false,
    customRequest: ({ file }) => {
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryData = e.target.result as any;
        const base64 = btoa(new Uint8Array(binaryData).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        console.log(base64);
      };
      reader.readAsArrayBuffer(file as Blob);
    },
  };
  return (
    <div className="p-10px flex-1 w-0">
      <Upload {...uploadProps}>
        <Button size="middle" type="primary">
          上传
        </Button>
      </Upload>
      {resourceData.map((i) => (
        <div key={i.type}>
          <Divider>{i.name}</Divider>
          {i.children.map((ii, index) => (
            <img key={index} className="w-50px h-50px" src={ii} alt="" />
          ))}
        </div>
      ))}
    </div>
  );
});

export default Resource;
