import { AbstractDefinition } from '@/packages/core/AbstractDefinition';
import editorStore from '../store/editorStore';

class EditorLoader {
  public definitionMap: Record<string, AbstractDefinition> = {};
  public componentMap: Record<string, any> = {};
  public load(): void {
    //扫描组件
    this.scanComponents();
  }

  public getLocalStorage() {
    const { setLayerList } = editorStore!;
    setLayerList();
  }

  protected scanComponents() {
    const glob = import.meta.glob('../../packages/components/**/*.ts', { eager: true }) as Record<string, any>;
    for (const key of Object.keys(glob)) {
      const Clazz = glob[key]?.default;
      if (Clazz) {
        const definition: AbstractDefinition = new Clazz();
        // 获取组件的基础信息
        if (typeof definition.getBaseInfo === 'function') {
          const type = definition.getBaseInfo().type;
          if (type) this.definitionMap[type] = definition;
        }

        if (typeof definition.getComponent === 'function') {
          const type = definition.getComponent().type;
          if (type) this.componentMap[type] = definition.getComponent().comp;
        }

        if (typeof definition.getComponentConfig === 'function') {
          const type = definition.getComponentConfig().type;
          if (type) this.componentMap[type] = definition.getComponentConfig().comp;
        }
      }
    }
  }
}

export default new EditorLoader();
