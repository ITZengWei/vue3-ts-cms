<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @query-btn-click="handleQueryClick"
      @reset-btn-click="handleResetClick"
    />

    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      propsName="role"
      @editBtnClick="handleEditData"
      @newBtnClick="handleNewData"
    />

    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultValue"
      pageName="role"
      :otherInfo="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        :props="{ children: 'children', label: 'name' }"
        node-key="id"
        show-checkbox
        @check="handleChekChange"
      />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import { ElTree } from 'element-plus'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import usePageSearch from '@/hooks/use-page-search'
import usePageModal from '@/hooks/use-page-modal'
/** 导入菜单数据转换为树数据转换方法 */
import { menuMapLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal,
  },
  setup() {
    /** elment 树组件 */
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    /** 用于存储在添加｜编辑角色的时候携带的角色菜单数据 */
    const otherInfo = ref<any>({})

    const store = useStore()

    const menus = computed(() => store.state.entireMenu)
    const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()
    const { pageModalRef, defaultValue, handleEditData, handleNewData } = usePageModal(
      undefined,
      editCallback,
    )

    /** 编辑执行的回调 */
    function editCallback(item: any) {
      // console.log(item, '当前编辑项')
      /** 将菜单数据转换为 tree Data */
      const leafKeys = menuMapLeafKeys(item.menuList)

      // console.log(leafKeys)

      /** 同步到 element-tree 视图中 */
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    /** 修改菜单树的 */
    const handleChekChange = (...args: any[]) => {
      const [, data] = args
      const { checkedKeys, halfCheckedKeys } = data
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      elTreeRef,
      otherInfo,
      menus,
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      handleChekChange,

      /** use-page-search */
      pageContentRef,
      handleQueryClick,
      handleResetClick,

      /** use-page-modal */
      pageModalRef,
      defaultValue,
      handleEditData,
      handleNewData,
    }
  },
})
</script>

<style scoped></style>
