import { nanoid } from 'nanoid';
export const $ = (selector): HTMLElement => {
  return document.querySelector(selector);
};

export function generateID() {
  return `id_${nanoid(6)}`;
}
