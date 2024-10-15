import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss';

function getBoxShadow(name: string) {
  switch (name) {
    case 'sm':
      return '0 2px 12px 0 #0000001a';
    default:
      return 'none';
  }
}
export default defineConfig({
  theme: {},
  rules: [
    [
      /^shadow-(\w+)$/,
      ([, name]) => ({
        'box-shadow': getBoxShadow(name),
      }),
    ],
  ],
  presets: [presetUno(), presetAttributify(), presetTypography(), presetIcons(), presetWebFonts()],
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['flex-between', 'flex justify-between'],
    ['flex-end', 'flex items-end'],
    ['text-ellipsis', 'text-ellipsis overflow-hidden whitespace-nowrap'],
    ['wh-full', 'w-full h-full'],
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
