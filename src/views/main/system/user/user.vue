<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @query-btn-click="handleQueryClick"
      @reset-btn-click="handleResetClick"
    />

    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      propsName="users"
      @editBtnClick="handleEditData"
      @newBtnClick="handleNewData"
    />

    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultValue"
      pageName="users"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import usePageSearch from '@/hooks/use-page-search'
import usePageModal from '@/hooks/use-page-modal'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal,
  },
  setup() {
    const store = useStore()
    /** 分页自定义钩子函数 */
    const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

    const createCallback = () => {
      /** 如果是新增的操作，我们把表单类型为 password 隐藏字段 设置为false */
      modalConfig.formItems.forEach((item) => {
        if (item.type === 'password') {
          item.isHidden = false
        }
      })
    }
    const editCallback = () => {
      /** 如果是编辑的操作，我们把表单类型为 password 隐藏字段 设置为true */
      modalConfig.formItems.forEach((item) => {
        if (item.type === 'password') {
          item.isHidden = true
        }
      })
    }

    /** 弹框表单自定义钩子函数 */
    const { pageModalRef, defaultValue, handleEditData, handleNewData } = usePageModal(
      createCallback,
      editCallback,
    )

    /** 从全局数据中，取出 role 和 department 数据，放入 select 选择框中 */
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find((item) => item.field === 'departmentId')
      const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')

      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    return {
      pageContentRef,
      searchFormConfig,
      contentTableConfig,
      pageModalRef,
      modalConfigRef,
      defaultValue,
      handleQueryClick,
      handleResetClick,
      handleEditData,
      handleNewData,
    }
  },
})
</script>

<style scoped></style>
