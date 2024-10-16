import contextmenuStore from '@/Editor/store/contextmenuStore';
import { useKeyPress } from 'ahooks';
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
    window.addEventListener('keydown', handleKeydown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeydown, { capture: true });
    };
  });
  const { onCopy, onPaste, onDelete, onSave } = contextmenuStore;

  useKeyPress(['ctrl.c', 'ctrl.v', 'ctrl.s', 'delete'], (_, key) => {
    switch (key) {
      case 'ctrl.c':
        onCopy();
        break;
      case 'ctrl.v':
        onPaste();
        break;
      case 'ctrl.s':
        onSave();
        break;
      case 'delete':
        onDelete();
        break;
      default:
        break;
    }
  });
  return <div />;
});

export default HotKeyPress;
