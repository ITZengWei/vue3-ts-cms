import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export default function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  /** 表单弹框 vue 组件 */
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  /** 用于存储当编辑操作的字段 */
  const defaultValue = ref({})

  /** 处理新增数据 */
  const handleNewData = () => {
    /** 重置之前存储的数据 */
    defaultValue.value = {}
    const pageModelRefVal = pageModalRef.value

    if (pageModelRefVal) {
      /** 通过这个方式去修改值 */
      pageModelRefVal.centerDialogVisible = true
      pageModelRefVal.title = '新增'
    }

    newCb && newCb()
  }

  /** 处理编辑数据 */
  const handleEditData = (item: any) => {
    /** 存储编辑的原始数据 */
    defaultValue.value = { ...item }
    const pageModelRefVal = pageModalRef.value

    if (pageModelRefVal) {
      pageModelRefVal.centerDialogVisible = true
      pageModelRefVal.title = '编辑'
    }

    editCb && editCb(item)
  }

  return {
    pageModalRef,
    handleNewData,
    handleEditData,
  }
}
