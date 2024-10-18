import contextmenuStore from '@/Editor/store/contextmenuStore';
import editorStore from '@/Editor/store/editorStore';
import { observer } from 'mobx-react';
import { styled } from 'styled-components';

const defaultDesignerMenus = [
  {
    name: '复制',
    onClick: contextmenuStore.onCopy,
  },
  {
    name: '粘贴',
    onClick: contextmenuStore.onPaste,
  },
  {
    name: '删除',
    onClick: contextmenuStore.onDelete,
  },
];

const StyleContextMenu = styled.div`
  background-color: #fff;
  padding: 5px;
  width: 130px;
  transition: opacity 250ms ease !important;
  z-index: 999999;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const StyleMenuItem = styled.div`
  display: flex;
  color: #000;
  font-size: 13px;
  padding: 9px 8px;
  cursor: pointer;

  &:hover {
    transition: background-color 0.3s ease;
    background-color: #ccc;
  }
`;

const ContextMenu = observer(() => {
  const { visible, position } = contextmenuStore;
  const { curLayer } = editorStore!;

  const calculateMenus = () => {
    const menus: any = [...defaultDesignerMenus];
    if (curLayer?.lock) {
      menus.push({
        name: '解锁',
        onClick: contextmenuStore.onUnLock,
      });
    } else {
      menus.push({
        name: '锁定',
        onClick: contextmenuStore.onLock,
      });
    }
    return menus;
  };

  const calculatePosition = (offsetW: number, offsetY: number) => {
    const [x, y] = position;
    const { innerWidth, innerHeight } = window;
    let left = x;
    let top = y;
    if (x + offsetW > innerWidth) left = innerWidth - offsetW;
    if (y + offsetY > innerHeight) top = innerHeight - offsetY;
    return [left, top];
  };

  const calculateMenuSize = (menuCount: number) => {
    const menuHeight = 33;
    return [130, menuCount * menuHeight];
  };

  const menus = calculateMenus();
  const [offsetW, offsetH] = calculateMenuSize(menus.length);
  const _position = calculatePosition(offsetW, offsetH);

  const buildMenuList = () => {
    const menuListDom = [];
    for (let i = 0; i < menus.length; i++) {
      const menuItem = menus[i];
      menuListDom.push(
        <StyleMenuItem key={i} onClick={menuItem?.onClick}>
          <span>{menuItem.name}</span>
        </StyleMenuItem>,
      );
    }
    return menuListDom;
  };
  return (
    <>
      {visible && (
        <StyleContextMenu
          style={{
            position: 'fixed',
            top: _position[1],
            left: _position[0],
          }}
        >
          {buildMenuList()}
        </StyleContextMenu>
      )}
    </>
  );
});

export default ContextMenu;
