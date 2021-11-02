<template>
  <div class="page-content">
    <hy-table
      v-bind="contentTableConfig"
      :listData="dataList"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <template #headerHandler v-if="isCreate">
        <el-button type="primary" size="medium" @click="handleNewClick">新建</el-button>
      </template>
      <template #status="scope">
        <span>{{ scope.row.enable === 1 ? '开启' : '关闭' }}</span>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>

      <!-- 操作按钮 -->
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, PropType } from 'vue'
import { useStore } from '@/store'
import hyTable, { ITableProps } from '@/base-ui/table'
import usePermission from '@/hooks/use-permission'

export default defineComponent({
  components: {
    hyTable,
  },
  props: {
    contentTableConfig: {
      type: Object as PropType<ITableProps>,
      required: true,
    },
    propsName: {
      type: String,
      required: true,
    },
  },
  emits: ['editBtnClick', 'deleteBtnClick', 'newBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    /** 是否拥有查询的条件 (TODO) */
    const isCreate = usePermission(props.propsName, 'create')
    const isDelete = usePermission(props.propsName, 'delete')
    const isUpdate = usePermission(props.propsName, 'update')
    const isQuery = usePermission(props.propsName, 'query')

    /** 存储在 vuex system 对应的数据 */
    const dataList = computed(() => {
      return store.getters[`system/pageListData`](props.propsName)
    })

    const dataCount = computed(() => {
      return store.getters[`system/pageCountData`](props.propsName)
    })

    /** 分页信息 */
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    watch(pageInfo, () => queryPageData(), { immediate: true })

    function queryPageData(queryInfo: any = {}) {
      /** 如果没有查找权限直接退出 */
      if (!isQuery) return
      const { currentPage, pageSize: size } = pageInfo.value
      const offset = (currentPage - 1) * size

      store.dispatch('system/getPageListAction', {
        pageName: props.propsName,
        queryInfo: {
          offset,
          size,
          ...queryInfo,
        },
      })
    }

    const handleNewClick = () => {
      emit('newBtnClick')
    }

    const handleDeleteClick = (row: any) => {
      console.log(row)
      emit('deleteBtnClick', row)
    }

    const handleEditClick = (row: any) => {
      console.log(row)
      emit('editBtnClick', row)
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      isCreate,
      isDelete,
      isUpdate,
      isQuery,
      handleNewClick,
      handleDeleteClick,
      handleEditClick,

      /** 暴露给外部组件使用的方法 */
      queryPageData,
    }
  },
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
