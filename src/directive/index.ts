import directive from './directives'

const importDirective = (Vue: any) => {
  /**
   * 复制指令 v-clipboard
   */
  Vue.directive('clipboard', directive.clipboard)
  Vue.directive('auth', directive.auth)
}

export default importDirective

export { directive }
