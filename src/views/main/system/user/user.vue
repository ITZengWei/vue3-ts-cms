<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @query-btn-click="handleQueryClick"
      @reset-btn-click="handleResetClick"
    />
  </div>

  <page-content
    ref="pageContentRef"
    :contentTableConfig="contentTableConfig"
    propsName="users"
    @editBtnClick="handleEditData"
    @newBtnClick="handleNewData"
  />

  <page-modal ref="pageModalRef" :modalConfig="modalConfigRef" pageName="users" />
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

    /** 弹框表单自定义狗子函数 */
    const { pageModalRef, handleEditData, handleNewData } = usePageModal()

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
      handleQueryClick,
      handleResetClick,
      handleEditData,
      handleNewData,
    }
  },
})
</script>

<style scoped></style>
