<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)">
          <base-echart :options="options" />
          <!-- <pie-echart :pieData="categoryGoodsCount"></pie-echart> -->
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量">
          <!-- <map-echart :mapData="addressGoodsSale"></map-echart> -->
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)">
          <!-- <rose-echart :roseData="categoryGoodsCount"></rose-echart> -->
        </hy-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <!-- <line-echart v-bind="categoryGoodsSale"></line-echart> -->
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏">
          <!-- <bar-echart v-bind="categoryGoodsFavor"></bar-echart> -->
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { EChartsOption } from 'echarts'
import HyCard from '@/base-ui/card'
import BaseEchart from '@/base-ui/echart'
import { useStore } from '@/store'

export default defineComponent({
  name: 'dashboard',
  components: {
    HyCard,
    BaseEchart,
  },
  setup() {
    const store = useStore()

    const options: EChartsOption = {
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    }

    onMounted(() => {
      store.dispatch('dashboard/getDashboardDataAction').then((res) => {
        console.log(res)
      })
    })

    return {
      options,
    }
  },
})
</script>

<style scoped></style>
