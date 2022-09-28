import defineVue from '@/main'
export function useForm() {
  const { ref, nextTick, unref } = defineVue() as any
  const formRef = ref(null)
  const formData = ref({})
  const root = ref(null)

  /**
   * @param el 当前form实例
   * @param _this 当前实例
   * @param data form表单数据
   * @description 用于表单注册
   */
  function register(el: any, _this: any, data: IObj) {
    formRef.value = el
    formData.value = data
    root.value = _this
  }

  /**
   * @param field 需要修改的字段
   * @param val
   * @param path
   * @description 用于修改schema中的对应属性
   */
  function setProps(field: string, val: any, path: string) {
    nextTick(() => {
      unref(root).setProps(field, val, path)
    })
  }

  /**
   * @param formCong 需要新增数据
   * @param index 在哪里新增
   */
  function addSchema(formCong: FormSchemaConfig, index?: number) {
    nextTick(() => {
      unref(root).addSchema(formCong, index)
    })
  }

  /**
   * @param index 删除哪个数据
   */
  function delSchema(index?: number) {
    nextTick(() => {
      unref(root).delSchema(index)
    })
  }

  /**
   * @param field 字段
   * @param value 值
   */
  function setValue(field: string, value: FormValueType) {
    nextTick(() => {
      unref(root).setValue(field, value)
    })
  }

  function forceUpdateSchema() {
    nextTick(() => {
      unref(root).forceUpdateSchema()
    })
  }
  return {
    register,
    formRef,
    formData,
    setProps,
    addSchema,
    delSchema,
    setValue,
    forceUpdateSchema
  }
}
