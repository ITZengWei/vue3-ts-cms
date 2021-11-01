import { ref } from 'vue'
import PageContent from '@/components/page-content'

export default function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleQueryClick = (queryInfo: any) => {
    console.log(queryInfo)
    pageContentRef.value?.queryPageData(queryInfo)
  }

  const handleResetClick = () => {
    pageContentRef.value?.queryPageData()
  }

  return {
    pageContentRef,
    handleResetClick,
    handleQueryClick,
  }
}
