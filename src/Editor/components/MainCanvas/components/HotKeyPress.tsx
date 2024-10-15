import contextmenuStore from '@/Editor/store/contextmenuStore';
import { message } from 'antd';
import key from 'keymaster';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const HotKeyPress = observer(() => {
  useEffect(() => {
    // 阻止快捷键默认行为
    const handleKeydown = (e: KeyboardEvent) => {
      // 阻止默认保存
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault(); // 阻止默认行为
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
  const { onCopy, onPaste, onDelete, onSave } = contextmenuStore;

  useEffect(() => {
    // 保存
    key('⌘+s, ctrl+s', () => {
      onSave();
      message.success('保存成功');
    });
    // 复制
    key('⌘+c, ctrl+c', () => {
      onCopy();
      message.success('复制成功');
    });
    // 粘贴
    key('⌘+v, ctrl+v', () => {
      onPaste();
      message.success('粘贴成功');
    });
    // 删除
    key('delete, delete', () => {
      onDelete();
      message.success('删除成功');
    });
  }, []);
  return <div />;
});

export default HotKeyPress;
