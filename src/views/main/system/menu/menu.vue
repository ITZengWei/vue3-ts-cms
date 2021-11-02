<template>
  <div class="menu">
    <page-content :contentTableConfig="contentConfig" propsName="menu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentConfig } from './config/content.config'

export default defineComponent({
  name: 'menu',
  components: {
    PageContent,
  },
  setup() {
    return {
      contentConfig,
    }
  },
})
</script>

<style scoped></style>
