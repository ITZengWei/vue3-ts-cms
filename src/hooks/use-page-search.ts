import { ref } from 'vue'

export default function usePageSearch() {
  const pageContentRef = ref<any>()

  const handleQueryClick = (queryInfo: any) => {
    console.log(queryInfo)
    // pageContentRef.value?.getPageData(queryInfo)
  }

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  return {
    pageContentRef,
    handleResetClick,
    handleQueryClick,
  }
}
