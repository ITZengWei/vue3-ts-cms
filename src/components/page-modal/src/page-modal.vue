<template>
  <div>
    <el-dialog :title="title" v-model="centerDialogVisible" width="30%" center destroy-on-close>
      <hy-form v-bind="modalConfig" v-model="formData" />
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
    /** 其他存储到参数，附带的参数 */
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['confirmBtnClick'],
  setup(props, { emit }) {
    /** 控制 dialog 的显示 */
    const centerDialogVisible = ref(false)
    /** 弹框标题 */
    const title = ref('默认标题')
    /** 表单数据 */
    const formData = ref<any>({})
    const store = useStore()

    /** 监听传过来的表单原始数据, 同步到 内部 formData 中 */
    watch(
      () => props.defaultInfo,
      (newVal) => {
        const { formItems } = props.modalConfig
        formItems.forEach(({ field }) => {
          formData.value[field] = newVal[field]
        })
      },
    )

    /** 这里对添加和修改操作做一层封装 */
    const handleConfirmClick = () => {
      const { defaultInfo, pageName, otherInfo } = props
      /** 判断 defaultInfo 是否有key，有key 代表是编辑操作 */
      if (Object.keys(defaultInfo).length) {
        store.dispatch('system/editPageDataAction', {
          pageName,
          newData: {
            ...formData.value,
            ...otherInfo,
          },
          id: defaultInfo.id,
        })
      } else {
        /** 没有key代表的是添加操作 */
        store.dispatch('system/createPageDataAction', {
          pageName,
          newData: {
            ...formData.value,
            ...otherInfo,
          },
        })
      }

      /** 关闭弹框 */
      centerDialogVisible.value = false
      emit('confirmBtnClick')
    }

    return {
      formData,
      centerDialogVisible,
      title,
      handleConfirmClick,
    }
  },
})
</script>
