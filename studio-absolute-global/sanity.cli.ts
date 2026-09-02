import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'absolute',
  api: {
    projectId: 'msknl5l1',
    dataset: 'production'
  },
  deployment: {
    appId: 'w85hx06seqemp58v53w5isdi',
    autoUpdates: true,
  },
})
