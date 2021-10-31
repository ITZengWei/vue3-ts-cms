<template>
  <hyform v-bind="searchFormConfig" v-model="formData">
    <template #header>
      <h1>高级检索</h1>
    </template>

    <template #footer>
      <div class="handle-btns">
        <el-button icon="el-icon-refresh" @click="handleResetClick">重置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handleQueryClick">搜索</el-button>
      </div>
    </template>
  </hyform>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Hyform, { IFormItem } from '@/base-ui/form'

export default defineComponent({
  components: {
    Hyform,
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  emits: ['queryBtnClick', 'resetBtnClick'],
  setup(props, { emit }) {
    /** 拿到 props 里面传递的 formItems */
    const formItems: IFormItem[] = props.searchFormConfig.formItems

    /** 根据传递的formItems 生成一个 form数据 */
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)

    function handleResetClick() {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }

      emit('resetBtnClick')
    }
    function handleQueryClick() {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick,
    }
  },
})
</script>

<style lange="less" scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
