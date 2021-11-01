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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import usePageSearch from '@/hooks/use-page-search'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
  },
  setup() {
    const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

    const handleEditData = (payload: any) => {
      console.log(payload)
    }
    const handleNewData = (payload: any) => {
      console.log(payload)
    }

    return {
      pageContentRef,
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      handleResetClick,
      handleEditData,
      handleNewData,
    }
  },
})
</script>

<style scoped></style>
