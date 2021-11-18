<template>
  <base-echart :options="options" />
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { EChartsOption } from 'echarts'

interface IProps {
  title?: string
  /** X轴标题 */
  xLabels: string[]
  /** 折线图数据 */
  values: any[]
}

const props = defineProps<IProps>()

const options = computed(() => {
  return {
    title: {
      text: props.title || '',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLabels,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '分别销量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: props.values,
      },
    ],
  } as EChartsOption
})
</script>
