let messageInstance: any = null
import { Message } from 'element-ui'
const resetMessage = (options: any) => {
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = Message({ ...options, customClass: 'com-message' })
}
;['error', 'success', 'info', 'warning'].forEach((type: string) => {
  resetMessage[type] = (options: any) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})

export const ElMessage = resetMessage as any
