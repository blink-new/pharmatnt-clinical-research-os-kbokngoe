import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'pharmatnt-clinical-research-os-kbokngoe',
  authRequired: true
})

export default blink