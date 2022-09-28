<template>
  <el-table-column v-bind="{ ...getItemBindValue(child) }" :prop="child.key">
    <template v-for="item in child.children">
      <!-- 树型数据 -->
      <template v-if="item.children && item.children.length">
        <table-column :key="item[item.field]" :child="item" />
      </template>

      <template v-else>
        <el-table-column
          v-bind="{ ...getItemBindValue(item) }"
          :key="item[item.field]"
          :prop="item.field"
        >
          <!-- 表头插槽 -->
          <template v-if="slots[item.field + 'Header']" #header="scope">
            <!-- <slot :name="item.field + 'Header'" :column="item" :$index="scope.$index"></slot> -->
            <table-slot :slot-name="item.field + 'Header'" :column="item" :index="scope.$index" />
          </template>

          <!-- 表格内容插槽自定义 -->
          <template v-if="slots[item.field]" #default="scope">
            <!-- <slot
                :name="item.field"
                :row="scope.row"
                :column="item"
                :$index="scope.$index"
              ></slot> -->
            <table-slot
              :slot-name="item.field"
              :row="scope.row"
              :column="item"
              :index="scope.$index"
            />
          </template>

          <!-- 不需要插槽 -->
          <!-- <span v-if="!item.slots || !item.slots.default">
            {{ scope.row[item.field] }}
          </span> -->
        </el-table-column>
      </template>
    </template>
  </el-table-column>
</template>

<script lang="ts">
export default {
  name: 'TableColumn'
}
</script>

<script setup lang="ts">
import TableSlot from './Slot.vue'
import { deepClone } from '_u/common'
import defineVue from '@/main'
const { inject } = defineVue() as any

const slots = inject('slots') as any

defineProps({
  child: {
    type: Object,
    required: true
  }
})

function getItemBindValue(item: any) {
  const delArr: string[] = ['children']
  const obj = deepClone(item)
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
}
</script>
