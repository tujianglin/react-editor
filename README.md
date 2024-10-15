# 数控系统

[语雀文档](https://masterlink.yuque.com/xy0dzx/rocpxo/oraozh3h8y3i27uf#xmXJz)

## 组件代码生成

1. 终端输入 `pnpm new`
2. 写入组件名称, 首字母大写
3. 修改 `src/packages/componentList.ts` 文件

```typescript
import Label from './components/Label/init';
import TextBox from './components/TextBox/init';
// 引入创建的组件初始化

const list = [new TextBox(), new Label() /* ...添加组件 */];
const comps = [TextBox, Label /* 添加组件 */];

export function createComponent(index) {
  return new comps[index]();
}

export { list };
```

4. 修改 `src/packages/index.ts` 文件

```typescript
export { default as TextBox } from './components/TextBox/index';
export { default as TextBoxProps } from './components/TextBox/props';

export { default as Label } from './components/Label/index';
export { default as LabelProps } from './components/Label/props';

/** 默认导出引入组件和属性 */
```

5. 修改 `src/packages/utils/DynamicComponent.tsx` 文件

```typescript
import { /* 引入组件 */ Label, LabelProps, TextBox, TextBoxProps } from '../index';

const COMPONENT_MAP: Record<string, any> = {
  TextBox,
  TextBoxProps,

  Label,
  LabelProps,

  /* 写入组件 */
};
// ........
```
