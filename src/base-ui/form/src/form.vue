<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header" />
    </div>

    <el-form :label-width="labelWidth">
      <!-- 响应式布局配置 -->
      <el-row>
        <template v-for="item in formItems" :key="item.field">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <!-- 密码或输入框的判断 显示 -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>

              <!-- 下拉选择框判断 -->
              <template v-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="(option, key) in item.options"
                    :key="key"
                    :label="option.title"
                    :value="option.value"
                    v-model="formData[`${item.field}`]"
                  ></el-option>
                </el-select>
              </template>

              <!-- 下拉时间选择 -->
              <template v-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, PropType, defineComponent } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    /** 使用组件的 v-model 值 */
    modelValue: {
      type: Object,
      required: true,
    },
    /** 表单控件列表 */
    formItems: {
      type: Array as PropType<IFormItem[]>,
      /** TODO 这里不是 需要 () => ([]) 解决: 返回对象才需要用括号包裹 */
      default: () => [],
    },
    /** 表单盒子宽度 */
    labelWidth: {
      type: String,
      default: '100px',
    },
    /** 控件样式 */
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' }),
    },
    /** 列响应式布局配置 */
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
  },
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })

    /** 当内部 formData 改变的时候，同步父组件 v-model的值 */
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true },
    )

    return {
      formData,
    }
  },
})
</script>

<style lang="less" scoped>
.hy-form {
  padding-top: 22px;
}
</style>
