<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData" border style="width: 100%" v-bind="childrenProps">
      <el-table-column v-if="showIndexColumn" type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column
        v-if="showSelectColumn"
        type="index"
        label="序号"
        width="55"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" show-overflow-tooltip align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ propItem.prop && scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IPropItem } from '../types'

export default defineComponent({
  props: {
    /** 表格列表数据 */
    listData: {
      type: Array,
      required: true,
    },
    /** 表格列表数据总数 */
    listCount: {
      type: Number,
      defalut: 0,
    },
    /** 字段列表 */
    propList: {
      type: Array as PropType<IPropItem[]>,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    /** 是否展示索引列表 */
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    /** 是否展示选择项 */
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Object,
      default: () => ({}),
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}
.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
