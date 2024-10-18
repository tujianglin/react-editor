export function parseColor(cssColorString: string): number {
  if (cssColorString.startsWith('#')) {
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0xff;
    if (cssColorString.length === 4) {
      b = parseInt(cssColorString[1]);
      g = parseInt(cssColorString[2]);
      r = parseInt(cssColorString[3]);
    } else if (cssColorString.length === 5) {
      b = parseInt(cssColorString[1]);
      g = parseInt(cssColorString[2]);
      r = parseInt(cssColorString[3]);
      a = parseInt(cssColorString[4]);
    } else if (cssColorString.length === 7) {
      b = parseInt(cssColorString.substring(1, 3), 16);
      g = parseInt(cssColorString.substring(3, 5), 16);
      r = parseInt(cssColorString.substring(5, 7), 16);
    } else if (cssColorString.length === 9) {
      b = parseInt(cssColorString.substring(1, 3), 16);
      g = parseInt(cssColorString.substring(3, 5), 16);
      r = parseInt(cssColorString.substring(5, 7), 16);
      a = parseInt(cssColorString.substring(7, 9), 16);
    }
    return (r << 24) | (g << 16) | (b << 8) | a;
  } else if (cssColorString.startsWith('rgb')) {
    const start = cssColorString.indexOf('(') + 1;
    const end = cssColorString.indexOf(')');
    const parts = cssColorString.substring(start, end).split(',');

    const r = parseInt(parts[0]);
    const g = parseInt(parts[1]);
    const b = parseInt(parts[2]);
    const a = parts.length === 4 ? parseFloat(parts[3]) : 1;
    return (r << 24) | (g << 16) | (b << 8) | Math.round(a * 255);
  }
  return 0;
}

export function toCSSColorString(color): string {
  if (!color) return '';
  const r = (color >> 24) & 0xff;
  const g = (color >> 16) & 0xff;
  const b = (color >> 8) & 0xff;
  const a = color & 0xff;

  if (a === 255) {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } else {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`;
  }
}
