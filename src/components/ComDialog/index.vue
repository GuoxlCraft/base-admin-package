<template>
  <el-dialog
    v-bind="getBindValue"
    ref="dialogRef"
    draggable="false"
    :visible.sync="dialogVisible"
    :fullscreen="fullscreen"
    destroy-on-close
    :close-on-click-modal="false"
    top="10vh"
    v-on="$listeners"
  >
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
      <svg-icon
        v-if="showFullscreen"
        :icon-class="fullscreen ? 'exit-fullscreen' : 'fullscreen'"
        class-name="dialog__icon"
        @click="toggleFull"
      />
    </template>

    <!-- 弹窗内容 -->
    <div
      v-if="dialogVisible"
      class="dialog__scroll"
      :class="
        fullscreen && $slots.footer
          ? 'com-dialog__content--footer'
          : fullscreen && !$slots.footer
          ? 'com-dialog__content--fullscreen'
          : 'com-dialog__content'
      "
    >
      <div class="content__wrap">
        <slot></slot>
      </div>
    </div>

    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'ComDialog'
}
</script>

<script setup lang="ts">
import defineVue from '@/main'
import SvgIcon from '_c/SvgIcon/index.vue'
const { watch, ref, nextTick, computed, getCurrentInstance } = defineVue() as any
const root = (getCurrentInstance() as any).proxy

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  // 是否显示全屏按钮
  showFullscreen: {
    type: Boolean,
    default: false
  },
  // 是否可以拖拽
  draggable: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const visible = computed(() => props.visible)
const fullscreen = ref(false)
const dialogVisible = ref(false)
const getBindValue = computed(() => {
  const bindValue = { ...root.$attrs, ...props }
  return bindValue
})

watch(
  visible,
  (val: boolean) => {
    dialogVisible.value = val
    if (props.draggable) {
      initDraggable()
    }
  },
  {
    immediate: true
  }
)

watch(
  dialogVisible,
  (val: boolean) => {
    root.$emit('update:visible', val)
  },
  {
    immediate: true
  }
)

function toggleFull() {
  fullscreen.value = !fullscreen.value
  // 全屏的时候需要重新定义left top
  if (fullscreen.value && props.draggable) {
    const dragDom = root.$el.querySelector('.el-dialog') as HTMLElement
    dragDom.style.cssText += `;left:0px;top:0px;`
  }
}

function initDraggable() {
  nextTick(() => {
    const dragDom = (root.$refs.dialogRef as any).$el.querySelector('.el-dialog') as HTMLElement
    const dialogHeaderEl = dragDom.querySelector('.el-dialog__header') as HTMLElement

    dragDom.style.cssText += ';top:0px;'
    dialogHeaderEl.style.cssText += ';cursor:move;user-select:none;'
    dialogHeaderEl.onmousedown = (e) => {
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight

      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

      const styleLeftStr = getComputedStyle(dragDom).left
      const styleTopStr = getComputedStyle(dragDom).top
      if (!styleLeftStr || !styleTopStr) return
      let styleLeft: number
      let styleTop: number

      // Format may be "##%" or "##px"
      if (styleLeftStr.includes('%')) {
        styleLeft = +document.body.clientWidth * (+styleLeftStr.replace(/%/g, '') / 100)
        styleTop = +document.body.clientHeight * (+styleTopStr.replace(/%/g, '') / 100)
      } else {
        styleLeft = +styleLeftStr.replace(/px/g, '')
        styleTop = +styleTopStr.replace(/px/g, '')
      }

      document.onmousemove = (e) => {
        let left = e.clientX - disX
        let top = e.clientY - disY

        // Handle edge cases
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }
        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // Move current element
        dragDom.style.cssText += `;left:${left + styleLeft}px;top:${top + styleTop}px;`
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  })
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog {
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}
/deep/ .el-dialog__header {
  padding: 20px 20px 10px;
  line-height: 20px;
  flex: 0 0 50px;
  height: 50px;
}
/deep/ .el-dialog__footer {
  flex: 0 0 66px;
  height: 66px;
}
/deep/ .el-dialog__headerbtn {
  top: 20px;
  line-height: 20px;
}
/deep/ .el-dialog__body {
  max-height: calc(100% - 50px);
  overflow: auto;
}
.dialog__scroll {
  overflow: auto;
}
.dialog__icon {
  position: absolute;
  top: 24px;
  right: 45px;
  font-size: 12px;
  line-height: 20px;
  color: #909399;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #409eff;
  }
}

.com-dialog__content {
  .content__wrap {
    padding: 0 10px 20px 0;
  }

  /deep/ .el-scrollbar__wrap {
    max-height: 600px; // 最大高度
    overflow-x: hidden; // 隐藏横向滚动栏
  }
}

.com-dialog__content--fullscreen {
  /deep/ .el-scrollbar__wrap {
    height: calc(~'100vh - 32px - 60px'); // 最大高度
  }
}

.com-dialog__content--footer {
  /deep/ .el-scrollbar__wrap {
    max-height: calc(~'100vh - 32px - 60px - 66px'); // 最大高度
  }
}
</style>
