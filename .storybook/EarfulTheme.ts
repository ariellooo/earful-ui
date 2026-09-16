import { create } from 'storybook/theming'

/** Storybook manager theme aligned with Earful design tokens (src/styles/tokens.css). */
export default create({
  base: 'light',

  brandTitle: 'Earful UI',
  brandUrl: 'https://earful-ui.netlify.app',
  brandImage: '/logos/earful_primary_logo.svg',
  brandTarget: '_blank',

  colorPrimary: '#2bc7e0',
  colorSecondary: '#085b92',

  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#cbd5e1',
  appBorderRadius: 8,

  fontBase: '"TT Norms Pro", system-ui, sans-serif',
  fontCode: 'ui-monospace, monospace',

  textColor: '#0f172a',
  textInverseColor: '#ffffff',
  textMutedColor: '#64748b',

  barTextColor: '#64748b',
  barSelectedColor: '#0f172a',
  barHoverColor: '#334155',
  barBg: '#ffffff',

  inputBg: '#ffffff',
  inputBorder: '#cbd5e1',
  inputTextColor: '#0f172a',
  inputBorderRadius: 6,

  buttonBg: '#f1f5f9',
  buttonBorder: '#cbd5e1',
})
