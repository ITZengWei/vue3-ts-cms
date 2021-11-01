<template>
  <div>
    <el-dialog :title="title" v-model="centerDialogVisible" width="30%" center destroy-on-close>
      <hy-form v-bind="modalConfig" v-model="xxx" />
      <slot />

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
import HyForm, { IForm } from '@/base-ui/form'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    HyForm,
  },
  props: {
    modalConfig: {
      type: Object as PropType<IForm>,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      required: true,
    },
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    /** 控制 dialog 的显示 */
    const centerDialogVisible = ref(false)
    /** 弹框标题 */
    const title = ref('默认标题')
    const store = useStore()

    watch(
      () => props.defaultInfo,
      (newVal) => {
        console.log(newVal)
      },
    )

    const handleConfirmClick = () => {
      console.log(store)
    }

    return {
      centerDialogVisible,
      title,
      handleConfirmClick,
    }
  },
})
</script>
