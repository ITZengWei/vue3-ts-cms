<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @query-btn-click="handleQueryClick"
      @reset-btn-click="handleResetClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import usePageSearch from '@/hooks/use-page-search'

export default defineComponent({
  components: {
    PageSearch,
  },
  setup() {
    const { handleQueryClick, handleResetClick } = usePageSearch()

    return {
      handleQueryClick,
      handleResetClick,
      searchFormConfig,
    }
  },
})
</script>

<style scoped></style>
