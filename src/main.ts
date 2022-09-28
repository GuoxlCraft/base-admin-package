let vue: IObj = {}

function defineVue(compositionApi?: any, ElementUI?: any, Vue?: any) {
  return (function () {
    if (compositionApi) {
      vue = compositionApi
      vue.elementUI = ElementUI
      vue.Vue = Vue
    } else {
      return vue
    }
  })()
}
// components组件
import SvgIcon from '_c/SvgIcon/index.vue' // svg组件
import ComTable from '_c/ComTable/index.vue' // ComTable组件
import ComSearch from '_c/ComSearch/index.vue' // Search组件
import ComDialog from '_c/ComDialog/index.vue' // Dialog组件
import ComDetail from '_c/ComDetail/index.vue' // Detail组件
import ComForm from '_c/ComForm/index.vue' // Form组件
import Echart from '_c/Echart/index.vue' // Echart组件
import Ellipsis from '_c/Ellipsis/index.vue' // Ellipsis组件
import Marquee from '_c/Marquee/index.vue' // Marquee组件
import { ElMessage } from '_c/Message' // Message组件
import Preview from '_c/Preview' // Preview组件

// layout 组件
import showMore from '_l/showMore/index.vue'

// 全局指令
import importDirective from '@/directive'
// 全局hooks
import $hooks from '@/hooks'
// 全局方法
import { $animation, $domUtils, $formRules, $utils, $validate } from '@/utils/index'
export default defineVue
export {
  SvgIcon,
  ComTable,
  ComSearch,
  ComDialog,
  ComDetail,
  ComForm,
  Echart,
  Ellipsis,
  Marquee,
  ElMessage,
  Preview,
  showMore,
  importDirective,
  $hooks,
  $animation,
  $domUtils,
  $formRules,
  $utils,
  $validate
}
