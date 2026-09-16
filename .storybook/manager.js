import { addons } from 'storybook/manager-api'
import earfulTheme from './EarfulTheme.ts'

addons.setConfig({
  theme: earfulTheme,
})
