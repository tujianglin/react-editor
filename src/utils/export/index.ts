import editorStore from '@/Editor/store/editorStore';
import { ISystem, LayerItem } from '@/packages/types/component';
import { cloneDeep } from 'lodash-es';
import { BinaryWriter } from './BinaryStream';
const writeFn = {
  1: 'WriteBoolean',
  2: 'WriteInt8',
  3: 'WriteInt16',
  4: 'WriteInt32',
  5: 'WriteInt64',
  10: 'WriteDouble',
  11: 'WriteInt64',
  12: 'WriteString',
  15: 'WriteArray',
  64: 'WriteString',
  65: 'WriteString',
};

function componentWrite(writer: BinaryWriter, data: LayerItem) {
  // 这里还需将页面其他数据转换成2进制
  let props = [];

  // 自身属性
  Object.entries(data.properties).map(([_, value]) => {
    props.push(value);
  });
  // 排序
  props = props.sort((a, b) => a.index - b.index);
  console.log(data.classType, data.type);
  // 写入
  props.map((i) => {
    // 类型不存在解析方法就跳过
    if (writeFn[i.type]) {
      writer.WriteInt8(i.type);

      let defaultValue: any = 0;

      if (i.type == 1) {
        defaultValue = false;
      }

      if (i.type == 12 || i.type >= 64) {
        defaultValue = '';
      }

      const pvalue = i.metaData || i.value || defaultValue;
      console.log(i.index, writer.Position + ' - ' + i.type + ' : ' + writeFn[i.type] + ' : ' + pvalue);

      writer[writeFn[i.type]](pvalue);
    }
  });
}
function traverse(writer: BinaryWriter, data: LayerItem) {
  writer.WriteInt32(0);
  const curPosition = writer.Position;

  //写属性
  componentWrite(writer, data);

  if (data.children?.length) {
    console.log('组件数量', data.children?.length);
    writer.Write7BitEncodedInt(data.children?.length); // 子组件个数

    data.children.forEach((child) => {
      writer.WriteInt16(child.classType); // 组件类型
      traverse(writer, child);
    });
  } else {
    if (data.classType < 5) writer.Write7BitEncodedInt(0); // 容器类组件需要明确不包含子组件
  }

  const end = writer.Position;
  const len = end - curPosition;
  writer.Position = curPosition - 4;
  writer.WriteInt32(len);
  writer.Position = end;
}

async function getNewFileHandle() {
  const opts = {
    types: [
      {
        description: 'Text file',
        accept: { 'text/plain': ['.io'] },
      },
    ],
  };

  return await (<any>window).showSaveFilePicker(opts);
}

/* 文件结构写入 */
const fileWrite = (writer: BinaryWriter) => {
  const system = cloneDeep(editorStore.system) as ISystem;
  writer.WriteInt32(0x574d5549); // 固定头
  writer.WriteInt32(0x00010001); // 版本
  writer.WriteInt32(0); // 标志位1
  writer.WriteInt32(0); // 标志位2
  writer.WriteString('test'); // UI标题
  writer.WriteString('哈哈哈'); //  作者信息
  writer.WriteString('wm'); // 版权信息
  writer.WriteString(system.name); // 主窗口
  writer.WriteInt32(system.width); // 宽
  writer.WriteInt32(system.height); // 高
  writer.WriteInt32(0); //
};

/* 资源区域写入 */
const resourceWrite = (writer: BinaryWriter) => {
  writer.Write7BitEncodedInt(0); // 资源数据区 数组长度
  // writer.WriteInt8(0); // 图片
  // writer.WriteString('demo-resource'); // 资源名称

  // const curPosition = writer.Position;
  // writer.WriteInt32(0); // 资源内容数据长度

  // writer.Write7BitEncodedInt(0); // 图片个数
  // writer.WriteString('image/png');
  // writer.Write7BitEncodedInt(0); // 内容长度

  // const end = writer.Position;
  // const len = end - curPosition;
  // writer.Position = curPosition;
  // writer.WriteInt32(len);
  // writer.Position = end;
};

/* 窗口写入 */
const windowWrite = (writer: BinaryWriter, data) => {
  writer.Write7BitEncodedInt(data.length); // 窗口数组长度

  // 多窗口遍历
  data.forEach((item) => {
    writer.WriteInt16(item.classType); // 窗口等同组件，写入组件类型
    traverse(writer, item as LayerItem);
  });
};

export const exportToIo = async (data: LayerItem[]) => {
  const writer = new BinaryWriter(1000);
  // 写入文件基本结构
  fileWrite(writer);

  // 写资源数据区
  resourceWrite(writer);

  // 写窗口数据区
  windowWrite(writer, data);

  const fileHandle = await getNewFileHandle();
  const writable = await fileHandle.createWritable();
  await writable.write(writer.ToBytes());
  await writable.close();
};
