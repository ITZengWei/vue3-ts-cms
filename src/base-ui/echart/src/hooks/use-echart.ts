/**
 * 为什么需要对 useEchart封装
 * 1. 图表对 echart耦合度高
 * 2. 代码重复率高
 */
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

export default function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)

  window.addEventListener('resize', onResize)

  function setOptions(options: EChartsOption) {
    echartInstance.setOption(options)
  }

  function updateSize() {
    echartInstance.resize()
  }

  function onResize() {
    updateSize()
  }

  return {
    setOptions,
    updateSize,
  }
}
