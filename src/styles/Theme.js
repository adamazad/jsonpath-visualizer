import { defaultRebootTheme } from 'styled-reboot';

export const fonts = {
  base: `"Space Mono", monospace`,
  monospace: `"Space Mono", monospace`,
  heading: `"Space Mono", monospace`,
}

export const colors = {
  text: '#000e1a',
  black: '#121212',
  gray: '#9B9B9B',
  white: '#ffffff',
  blue: '#3426F1',
  navy: '#004175',
  purple: '#3426F1',
  lightGray: '#f7f7f7',
}

export const reboot = {
  ...defaultRebootTheme,
}

console.log(reboot);

const Theme = {
  ...reboot,
  fonts,
  colors,
}

export default Theme;