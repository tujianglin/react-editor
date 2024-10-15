import { BaseInfo } from '../types/component';

export abstract class AbstractDefinition<C = any, P = any> {
  abstract getBaseInfo(): BaseInfo;
  abstract getInitConfig(): P;
  abstract getComponent(): C;
  abstract getComponentConfig(): C;
}
