export function treeForEach<T = any>(tree: T[], func: (n: T) => any): void {
  const list: any[] = [...tree];
  for (let i = 0; i < list.length; i++) {
    //func 返回true就终止遍历，避免大量节点场景下无意义循环，引起浏览器卡顿
    if (func(list[i])) {
      return;
    }
    list[i]['children'] && list.splice(i + 1, 0, ...list[i]['children']);
  }
}

export function treeToList(treeData) {
  const result = [];
  function traverse(node) {
    result.push(node); // 将当前节点添加到结果数组中
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        traverse(child); // 递归遍历子节点
      });
    }
  }
  treeData.forEach((rootNode) => {
    traverse(rootNode); // 开始遍历树根节点
  });

  return result;
}
