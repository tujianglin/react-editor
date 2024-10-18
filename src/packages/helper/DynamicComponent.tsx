import EditorLoader from '@/Editor/loader/EditorLoader';

export const DynamicComponent = (props) => {
  const { is } = props;
  // 根据传入的 is 选择组件
  const SelectedComponent = EditorLoader.componentMap[is];
  // 如果组件存在，则渲染它，否则渲染 null 或者一个备用组件
  return SelectedComponent ? <SelectedComponent {...props} /> : null;
};
