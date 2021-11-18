<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)">
          <!-- <base-echart :options="options" /> -->
          <pie-echart :pieData="categoryGoodsCount" />
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
import { defineComponent, computed } from 'vue'
import HyCard from '@/base-ui/card'
import { PieEchart } from '@/components/page-echarts'
import { useStore } from '@/store'

export default defineComponent({
  name: 'dashboard',
  components: {
    HyCard,
    PieEchart,
  },
  setup() {
    const store = useStore()

    /** 请求数据 */
    store.dispatch('dashboard/getDashboardDataAction')
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    /** 获取数据 */

    // onMounted(() => {
    //   store.dispatch('dashboard/getDashboardDataAction').then((res) => {
    //     console.log(res)
    //   })
    // })

    return {
      categoryGoodsCount,
    }
  },
})
</script>

<style scoped></style>
