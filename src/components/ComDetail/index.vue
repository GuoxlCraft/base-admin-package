<template>
  <div class="detail__wrap">
    <div class="detail__content" :style="contentStyleObj">
      <el-row type="flex">
        <el-col v-for="(item, $index) in schema" :key="$index" :span="item.span || 12">
          <div class="detail__content--item" :class="{ 'detail__content--flex': !vertical }">
            <div class="content__item--label" :style="labelStyleObj">
              <slot :name="item.field" :row="item">
                {{ item.label }}
              </slot>
            </div>
            <div class="content__item--message" :style="messageStyleObj">
              <slot :name="`${item.field}Content`" :row="data">
                {{ data[item.field] }}
              </slot>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ComDetail'
}
</script>

<script setup lang="ts">
import defineVue from '@/main'
const { computed } = defineVue() as any
const props = defineProps({
  // 是否需要边框
  border: {
    type: Boolean,
    default: false
  },
  // 需要展示的数据
  data: {
    type: Object,
    required: true
  },
  // 布局展示的数据
  schema: {
    type: Array as any,
    required: true
  },
  // 是否标题和内容各占一行 垂直布局
  vertical: {
    type: Boolean,
    default: false
  },
  // 标题宽度
  labelWidth: {
    type: String,
    default: '150px'
  },
  // 标题位置
  labelAlign: {
    type: String,
    default: 'left'
  },
  // 边框颜色
  borderColor: {
    type: String,
    default: '#f0f0f0'
  },
  // 标题背景颜色
  labelBg: {
    type: String,
    default: '#fafafa'
  },
  classic: {
    type: Boolean,
    default: true
  }
})
const contentStyleObj = computed(() => {
  return {
    borderTop: props.border ? `1px solid ${props.borderColor}` : '',
    borderLeft: props.border ? `1px solid ${props.borderColor}` : ''
  }
})
const labelStyleObj = computed(() => {
  return {
    width: (props.vertical ? `100%` : props.labelWidth) as any,
    textAlign: props.labelAlign as any,
    backgroundColor: (props.border && !props.classic ? props.labelBg : '') as any,
    borderRight: props.border && !props.classic ? `1px solid ${props.borderColor}` : '',
    borderBottom: props.border && !props.classic ? `1px solid ${props.borderColor}` : ''
  }
})
const messageStyleObj = computed(() => {
  return {
    width: props.vertical ? `100%` : `calc(100% - ${props.labelWidth})`,
    borderRight: props.border && !props.classic ? `1px solid ${props.borderColor}` : '',
    borderBottom: props.border && !props.classic ? `1px solid ${props.borderColor}` : ''
  }
})
</script>

<style lang="less" scoped>
.detail__wrap {
  .detail__content {
    /deep/ .el-row {
      flex-wrap: wrap;
    }

    .detail__content--flex {
      display: flex;
      height: 100%;
    }

    .content__item--label {
      padding: 11px 16px;
      font-size: 14px;
      line-height: 20px;
      color: #9daabc;
    }

    .content__item--message {
      padding: 11px 16px;
      // flex: 1;
      font-size: 16px;
      line-height: 20px;
      color: #24292F;
      overflow-wrap: break-word;
    }
  }
}
</style>
