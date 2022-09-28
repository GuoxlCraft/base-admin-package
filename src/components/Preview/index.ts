import defineVue from '@/main'
import Preview from './main.vue'
import { PreviewTypes } from './types'

let instance: any

const PreviewPic = function (options: PreviewTypes) {
  // 这里的Vue实例要改从项目库中传过来
  const Vue = (defineVue() as IObj).Vue
  const PreviewConstructor = Vue.extend(Preview as any)
  if (Vue.prototype.$isServer) return
  options = options || {}
  const userOnClose = options.onClose || null
  const userOnSelect = options.onSelect || null

  options.onClose = function (index: number) {
    document.body.style.overflow = 'auto'
    setTimeout(() => {
      if (userOnClose) {
        close(userOnClose, index)
      }
      document.body.removeChild(instance.vm.$el)
    }, 400)
  }
  options.onSelect = function (index: number) {
    if (userOnSelect) {
      select(userOnSelect, index)
    }
  }

  instance = new PreviewConstructor()
  instance.vm = instance.$mount()
  for (const key in options) {
    instance.vm[key] = options[key]
  }
  document.body.appendChild(instance.vm.$el)
  document.body.style.overflow = 'hidden'
  instance.vm.show = true
  return instance.vm
}

const close = function (userOnClose: Fn, index: number) {
  userOnClose(index)
}

const select = function (userOnSelect: Fn, index: number) {
  userOnSelect(index)
}

export default PreviewPic
