<template>
  <div>
    <el-form
      v-bind="getBindValue"
      ref="ruleForm"
      :model="slots['custom'] ? model : formInline"
      :label-width="labelWidth"
      v-on="$listeners"
      @submit.prevent
    >
      <template v-if="slots['custom']">
        <slot name="custom"></slot>
      </template>

      <template v-else>
        <component
          :is="isCol ? Row : 'div'"
          :gutter="20"
          :style="{
            display: isCol ? 'block' : 'inline-block'
          }"
        >
          <component
            :is="isCol ? Col : 'div'"
            v-bind="{ ...getColValue(item) }"
            v-for="item in schema"
            :key="item.field"
            :id="'formItem_' + item.field"
            :span="(item.colProps && item.colProps.span) || 12"
            :style="{
              display: isCol ? 'block' : 'inline-block'
            }"
          >
            <template v-if="item.component === 'Divider' && !item.hidden">
              <el-divider v-bind="{ ...item.componentProps }" />
            </template>

            <el-form-item
              v-bind="{ ...getFormItemValue(item) }"
              v-else-if="!item.hidden"
              :label="item.label"
              :prop="item.field"
            >
              <template v-if="slots && slots[item.field]">
                <slot
                  :name="item.field"
                  :model="formInline"
                  :item="item"
                  :field="item.field"
                ></slot>
              </template>

              <template v-else>
                <template v-if="item.component === 'Radio' && item.options">
                  <el-radio
                    v-bind="{ ...item.componentProps }"
                    v-for="v in item.options"
                    :key="`Radio${v.value}`"
                    v-model="formInline[item.field]"
                    :label="
                      item.optionsField && item.optionsField.valueField
                        ? v[item.optionsField.valueField]
                        : v.value
                    "
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  >
                    {{
                      item.optionsField && item.optionsField.labelField
                        ? v[item.optionsField.labelField]
                        : v.label
                    }}
                  </el-radio>
                </template>

                <template v-else-if="item.component === 'RadioGroup' && item.options">
                  <el-radio-group v-model="formInline[item.field]">
                    <el-radio
                      v-bind="{ ...item.componentProps }"
                      v-for="v in item.options"
                      :key="`RadioGroup${v.value}`"
                      :label="
                        item.optionsField && item.optionsField.valueField
                          ? v[item.optionsField.valueField]
                          : v.value
                      "
                      @change="
                        () => {
                          changeVal(item)
                        }
                      "
                    >
                      {{
                        item.optionsField && item.optionsField.labelField
                          ? v[item.optionsField.labelField]
                          : v.label
                      }}
                    </el-radio>
                  </el-radio-group>
                </template>

                <template v-else-if="item.component === 'Checkbox' && item.options">
                  <el-checkbox
                    v-bind="{ ...item.componentProps }"
                    v-for="v in item.options"
                    :key="`Checkbox${v.value}`"
                    v-model="formInline[item.field]"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  >
                    {{
                      item.optionsField && item.optionsField.labelField
                        ? v[item.optionsField.labelField]
                        : v.label
                    }}
                  </el-checkbox>
                </template>

                <template v-else-if="item.component === 'CheckboxGroup' && item.options">
                  <el-checkbox-group v-model="formInline[item.field]">
                    <el-checkbox
                      v-bind="{ ...item.componentProps }"
                      v-for="v in item.options"
                      :key="`CheckboxGroup${v.value}`"
                      :label="
                        item.optionsField && item.optionsField.valueField
                          ? v[item.optionsField.valueField]
                          : v.value
                      "
                      @change="
                        () => {
                          changeVal(item)
                        }
                      "
                    >
                      {{
                        item.optionsField && item.optionsField.labelField
                          ? v[item.optionsField.labelField]
                          : v.label
                      }}
                    </el-checkbox>
                  </el-checkbox-group>
                </template>

                <template v-else-if="item.component === 'Input'">
                  <el-input
                    v-bind="{ ...item.componentProps }"
                    :disabled="item.inputDisabled"
                    :placeholder="
                      (item.componentProps && item.componentProps.placeholder) || '请输入'
                    "
                    v-model.trim="formInline[item.field]"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  />
                </template>

                <template v-else-if="item.component === 'InputNumber'">
                  <el-input-number
                    v-bind="{ ...item.componentProps }"
                    v-model.trim="formInline[item.field]"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  />
                </template>

                <template v-else-if="item.component === 'Select'">
                  <el-select
                    v-bind="{ ...item.componentProps }"
                    v-model="formInline[item.field]"
                    :disabled="item.inputDisabled"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                    style="width: 100%"
                  >
                    <el-option
                      v-for="v in item.options"
                      :key="`Select${v.value}`"
                      :label="
                        item.optionsField && item.optionsField.labelField
                          ? v[item.optionsField.labelField]
                          : v.label
                      "
                      :value="
                        item.optionsField && item.optionsField.valueField
                          ? v[item.optionsField.valueField]
                          : v.value
                      "
                    />
                  </el-select>
                </template>

                <template v-else-if="item.component === 'Cascader' && item.options">
                  <el-cascader
                    v-bind="{ ...item.componentProps }"
                    v-model="formInline[item.field]"
                    :options="item.options"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  />
                </template>

                <template v-else-if="item.component === 'Switch'">
                  <el-switch
                    v-bind="{ ...item.componentProps }"
                    v-model="formInline[item.field]"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  />
                </template>

                <template v-else-if="item.component === 'Slider'">
                  <el-slider
                    v-bind="{ ...item.componentProps }"
                    v-model="formInline[item.field]"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  />
                </template>

                <template v-else-if="item.component === 'TimePicker'">
                  <el-time-select
                    v-bind="{ ...item.componentProps }"
                    v-model="formInline[item.field]"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                    style="width: 100%"
                  />
                </template>

                <template v-else-if="item.component === 'DatePicker'">
                  <el-date-picker
                    v-bind="{ ...item.componentProps }"
                    v-model="formInline[item.field]"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                    style="width: 100%"
                  />
                </template>

                <template v-else-if="item.component === 'Rate'">
                  <el-rate
                    v-bind="{ ...item.componentProps }"
                    v-model="formInline[item.field]"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  />
                </template>

                <template v-else-if="item.component === 'ColorPicker'">
                  <el-color-picker
                    v-bind="{ ...item.componentProps }"
                    v-model="formInline[item.field]"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  />
                </template>

                <template v-else-if="item.component === 'Transfer' && item.options">
                  <el-transfer
                    v-bind="{ ...item.componentProps }"
                    v-model="formInline[item.field]"
                    :data="item.options"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  />
                </template>

                <template v-else-if="item.component === 'TreeSelect' && item.options">
                  <tree-select
                    v-bind="{ ...item.componentProps }"
                    v-model="formInline[item.field]"
                    :data="item.options"
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                    style="width: 100%"
                  />
                </template>
              </template>
            </el-form-item>
          </component>
          <div v-if="isCol" class="clearfix"></div>
          <!-- <el-form-item label-width="0">
            <slot></slot>
          </el-form-item> -->
        </component>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ComForm'
}
</script>

<script setup lang="ts">
import { inputLength } from '_u/form-rules'
import TreeSelect from 'vue2-tree-select'
import 'vue2-tree-select/dist/css/index.css'
import { deepClone } from '@/utils/common'
import { set as objectSet } from 'lodash-es'
import {
  computed,
  useAttrs,
  ref,
  unref,
  watch,
  set,
  getCurrentInstance,
  nextTick,
  useSlots
} from 'vue'
import { Col, Row } from 'element-ui'
const root = (getCurrentInstance() as any).proxy

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  // 布局展示的数据
  schema: {
    type: Array as any,
    // required: true,
    default: (): FormSchemaConfig[] => []
  },
  // 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
  labelWidth: {
    type: String,
    default: '110px'
  },
  // 是否需要栅格
  isCol: {
    type: Boolean,
    default: true
  },
  // model对象
  model: {
    type: Object,
    default: null
  }
})

const formInline = ref({})
const schemaProps = ref(props.schema as any)

watch(
  schemaProps,
  (val: FormSchemaConfig[]) => {
    setFormValue(val)
  },
  {
    immediate: true,
    deep: true
  }
)
watch(
  formInline.value,
  () => {
    nextTick(() => {
      root.$emit('register', root.$refs.ruleForm, root, formInline.value)
    })
  },
  {
    immediate: true,
    deep: true
  }
)
function setFormValue(val: FormSchemaConfig[]) {
  const keys: string[] = []
  for (const v of val) {
    keys.push(v.field)
    if (!v.hidden) {
      const formValue = formInline.value[v.field]
      set(formInline.value, v.field, formValue !== void 0 ? formValue : v.value || '')
    }
  }
  for (const key in formInline.value) {
    if (keys.indexOf(key) === -1) {
      formInline.value[key] = undefined
    }
  }
}

const getBindValue = computed(() => {
  const bindValue = { ...attrs, ...props } as IObj
  delete bindValue.schema
  delete bindValue.labelWidth
  return bindValue
})

function getColValue(item: FormSchemaConfig) {
  const delArr = ['span']
  const obj = deepClone(item.colProps || {})
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
}

function getFormItemValue(item: FormSchemaConfig) {
  const delArr = ['label', 'prop']
  const obj = deepClone(item.formItemProps || {})
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  if (obj?.length) {
    item.component === 'Input' &&
      (obj.rules = obj.rules
        ? obj.rules.concat([inputLength(obj?.length)])
        : [inputLength(obj?.length)])
  }
  return obj
}

function changeVal(item: FormSchemaConfig) {
  if (item.onChange) {
    item.onChange({
      field: item.field,
      value: unref(formInline)[item.field]
    })
  }
}

function setProps(field: string, val: any, path: string) {
  schemaProps.value.map((v, i) => {
    if (v.field === field) {
      set(schemaProps.value, i, objectSet(v, path, val))
      // objectSet(v, path, val)
    }
  })
}

function addSchema(formCong: FormSchemaConfig, index?: number) {
  if (index !== void 0) {
    schemaProps.value.splice(index, 0, formCong)
    return
  }
  schemaProps.value.push(formCong)
}

function delSchema(index?: number) {
  if (index !== void 0) {
    schemaProps.value.splice(index, 1)
    return
  }
  schemaProps.value.pop()
}

function forceUpdateSchema() {
  // 解构赋值数组或者修改数组长度等操作，不会触发响应。所以对schema的这个类型的操作需要手动更新
  schemaProps.value = props.schema
  console.error(props.schema, 'q')
  setTimeout(() => {
    root.$refs.ruleForm.clearValidate()
  })
}

function setValue(field: string, value: FormValueType) {
  set(formInline.value, field, value)
}

defineExpose({
  setProps,
  addSchema,
  delSchema,
  setValue,
  forceUpdateSchema
})
</script>

<style></style>
