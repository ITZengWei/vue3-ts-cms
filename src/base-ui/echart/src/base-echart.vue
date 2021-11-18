<template>
  <div class="base-echart">
    <div ref="echartRef" :style="echartStyle"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, computed, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from './hooks/use-echart'

const echartRef = ref<HTMLElement>()

interface IBaseEchartProps {
  /** 配置项 */
  options: EChartsOption

  /** 宽度 */
  width?: string | number

  /** 高度 */
  height?: string | number
}

/** 定义props和默认参数 */
const props = withDefaults(defineProps<IBaseEchartProps>(), {
  width: '100%',
  height: '500px',
})

const echartStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
  }
})

onMounted(() => {
  const { setOptions } = useEchart(echartRef.value!)

  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>
