<template>
  <div class="ComTable">
    <el-table
      v-bind="getBindValue"
      ref="elTable"
      :border="true"
      :data="data"
      v-on="$listeners"
      @header-dragend="headerDragend"
    >
      <!-- 多选 -->
      <el-table-column
        v-if="selection"
        type="selection"
        :selectable="selectable"
        :reserve-selection="reserveSelection"
        width="40"
      />
      <template v-for="item in columns">
        <!-- 自定义索引 -->
        <template v-if="item.type === 'index'">
          <el-table-column
            v-bind="{ ...getItemBindValue(item) }"
            :key="item[item.field] + item[item.field]"
            type="index"
            :index="item.index"
          />
        </template>

        <!-- 树型数据 -->
        <template v-else-if="item.children && item.children.length">
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
              <slot :name="item.field + 'Header'" :column="item" :$index="scope.$index"></slot>
              <!-- <table-slot
                v-if="item.slots && item.slots.header"
                :slot-name="item.slots.header"
                :column="item"
                :index="scope.$index"
              /> -->
            </template>

            <!-- 表格内容插槽自定义 -->
            <template v-if="slots[item.field]" #default="scope">
              <slot
                :name="item.field"
                :row="scope.row"
                :column="item"
                :$index="scope.$index"
              ></slot>
              <!-- <table-slot
                v-if="item.slots && item.slots.default"
                :slot-name="item.slots.default"
                :row="scope.row"
                :column="item"
                :index="scope.$index"
              /> -->
            </template>
            <!-- 不需要插槽 -->
            <!-- <span v-if="!item.slots || !item.slots.default">
              {{ scope.row[item.field] }}
            </span> -->
          </el-table-column>
        </template>
      </template>
    </el-table>

    <div v-if="pagination" class="pagination__wrap">
      <el-pagination
        v-bind="getPaginationBindValue"
        :style="paginationStyle"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ComTable'
}
</script>

<script setup lang="ts">
import TableColumn from './components/TableColumn.vue'
import { deepClone } from '_u/common'
import { computed, getCurrentInstance, useSlots, provide } from 'vue'
const props = defineProps({
  // 表头
  columns: {
    type: Array as any,
    default: () => []
  },
  // 表头
  data: {
    type: Array as any,
    default: () => []
  },
  // 是否多选
  selection: {
    type: Boolean,
    default: false
  },
  // 是否可以选择
  selectable: {
    type: Function,
    default: null
  },
  // 是否展示分页
  pagination: {
    type: [Boolean, Object] as any,
    default: false
  },
  // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
  reserveSelection: {
    type: Boolean,
    default: false
  }
})

const vm = getCurrentInstance()?.proxy as any

const slots = useSlots()

provide('slots', slots)

const getBindValue = computed(() => {
  const bindValue = { ...vm.$attrs, ...props } as IObj
  delete bindValue.columns
  delete bindValue.data
  return bindValue
})

const getPaginationBindValue = computed(() => {
  const PaginationBindValue =
    props.pagination && typeof props.pagination === 'object' ? { ...props.pagination } : {}
  return PaginationBindValue
})

const paginationStyle = computed(() => {
  return {
    textAlign: (props.pagination && (props.pagination as IObj).position) || 'right'
  }
})

const getTableRef = computed(() => {
  return vm.$refs.elTable as any
})

function getItemBindValue(item: any) {
  const delArr: string[] = []
  const obj = deepClone(item)
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  if (obj['show-overflow-tooltip'] === undefined) {
    obj['show-overflow-tooltip'] = true
  }
  return obj
}

function headerDragend(newWidth: number, _: number, column: any) {
  // 不懂为啥无法自动计算宽度，只能手动去计算了。。失望ing，到时候看看能不能优化吧。
  const htmlArr = document.getElementsByClassName(column.id)
  for (const v of htmlArr as any) {
    if (v.firstElementChild) {
      ;(v.firstElementChild as HTMLElement).style.width = newWidth + 'px'
    }
  }
}

function sizeChange(val: number) {
  if (props.pagination && (props.pagination as IObj).onSizeChange) {
    ;(props.pagination as IObj).onSizeChange(val)
  }
}

function currentChange(val: number) {
  if (props.pagination && (props.pagination as IObj).onCurrentChange) {
    ;(props.pagination as IObj).onCurrentChange(val)
  }
}

defineExpose({
  getTableRef
})
</script>

<style lang="less" scoped>
.ComTable {
  height: 100%;
  width: 100%;
}
.pagination__wrap {
  padding: 10px;
  margin-top: 15px;
  background: #fff;
}
</style>
