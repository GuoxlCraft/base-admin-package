const auth = {
  inserted: (el: any, binding: any, vnode: any) => {
    const { value } = binding
    const btnPower = vnode?.context?.$root?.$route?.meta?.btnPower || []
    const hasPermission = btnPower.includes(value)
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

export default auth
