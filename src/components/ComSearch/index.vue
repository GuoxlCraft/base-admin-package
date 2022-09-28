<template>
  <div class="ComForm">
    <div class="ComForm-container" :class="{ flod: flod }">
      <div class="ComForm-container-left">
        <com-form
          :id="anyId"
          :schema="schema"
          :label-width="labelWidth"
          :is-col="false"
          inline
          hide-required-asterisk
          @register="register"
        >
          <template v-if="layout === 'classic'">
            <el-button type="primary" icon="el-icon-search" @click="submitForm" />
            <el-button v-if="showReset" icon="el-icon-refresh-right" @click="resetForm" />
          </template>
        </com-form>
        <div v-if="layout === 'bottom'" style="text-align: center">
          <el-button type="primary" icon="el-icon-search" @click="submitForm" />
          <el-button v-if="showReset" icon="el-icon-refresh-right" @click="resetForm" />
        </div>
      </div>
      <div v-if="layout === 'right'" class="ComForm-container-right">
        <div v-if="showReset" class="ComSearch-button" @click="resetForm">
          <i class="el-icon-refresh-right"></i>
        </div>
        <div class="ComSearch-button primary" @click="submitForm">
          <i class="el-icon-search"></i>
        </div>
        <div v-if="!flod && showFlod" class="ComSearch-flod" @click="setFlod(true)">
          收起
          <i class="el-icon-arrow-down"></i>
        </div>
        <div v-if="flod && showFlod" class="ComSearch-flod" @click="setFlod(false)">
          展开
          <i class="el-icon-arrow-up"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Search'
}
</script>

<script setup lang="ts">
import { useForm } from '_h/web/useForm'
import defineVue from '@/main'
const { unref, getCurrentInstance, ref, onBeforeUnmount } = defineVue() as any
const { register, formRef, formData, setValue } = useForm()
const root = (getCurrentInstance() as any).proxy

defineProps({
  // 风格
  layout: {
    type: String,
    default: 'right'
  },
  // 是否显示重置按钮
  showReset: {
    type: Boolean,
    default: true
  },
  labelWidth: {
    type: String,
    default: '80px'
  },
  // 布局展示的数据
  schema: {
    type: Array as any,
    required: true,
    default: (): FormSchemaConfig[] => []
  }
})

const flod = ref(false)
function setFlod(val: boolean) {
  flod.value = val
}

function submitForm() {
  unref(formRef).validate((valid: boolean) => {
    if (valid) {
      root.$emit('search-submit', formData.value)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

function resetForm() {
  unref(formRef).resetFields()
  root.$emit('reset-submit', formData.value)
}

// 监听高度
let observer: null | IObj = null
const showFlod = ref(false)
function initObserver() {
  // MutationObserver 监听Dom 的高度变化

  const CurrentElement = document.getElementById(anyId.value)
  if (CurrentElement) {
    observer = new ResizeObserver((entries) => {
      const { height } = entries[0].contentRect
      showFlod.value = height >= 60
    })
    observer.observe(CurrentElement)
  }
}

const anyId = ref('search' + toAnyString())

function toAnyString() {
  const str: string = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c: string) => {
    const r: number = (Math.random() * 16) | 0
    const v: number = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString()
  })
  return str
}

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
setTimeout(() => {
  initObserver()
})

defineExpose({
  setValue
})
</script>

<style scoped lang="less">
.ComSearch {
  &-flod {
    flex: 0 0 60px;
    width: 60px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    color: #4479ff;
    font-size: 14px;
    margin-left: 10px;
    border-radius: 18px;
    cursor: pointer;
    i {
      margin-left: 5px;
      color: #4479ff;
    }
    &:hover {
      background: #fafafa;
      i {
        color: #4479ff;
      }
    }
  }
  &-button {
    flex: 0 0 60px;
    width: 60px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 18px;
    margin-left: 10px;
    cursor: pointer;
    i {
      color: #cccccc;
    }
    &:hover {
      background: #fafafa;
      i {
        color: #666;
      }
    }
  }
  &-button.primary {
    flex: 0 0 60px;
    width: 60px;
    height: 36px;
    color: #fff;
    background: #4479ff;
    border: 1px solid #4479ff;
    border-radius: 18px;
    i {
      color: #fff;
    }
    &:hover {
      background: #306aff;
    }
  }
}
.ComForm {
  &-container {
    display: flex;
    &-left {
      width: calc(100% - 200px);
      margin-right: 10px;
    }
    &-right {
      width: 200px;
      display: flex;
      justify-content: flex-end;
    }
    &.flod {
      height: 58px;
      overflow: hidden;
    }
  }
}
</style>
