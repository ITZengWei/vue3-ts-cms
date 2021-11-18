<template>
  <base-echart :options="options" />
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import BaseEchart from '@/base-ui/echart'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

interface IProps {
  title?: string
  /** X轴标题 */
  xLabels: string[]
  /** 柱形图数据 */
  values: any[]
}

const props = defineProps<IProps>()

const options = computed(() => {
  return {
    xAxis: {
      data: props.xLabels,
      axisLabel: {
        inside: true,
        color: '#fff',
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#999',
      },
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' },
            ]),
          },
        },
        data: props.values,
      },
    ],
  } as EChartsOption
})
</script>
