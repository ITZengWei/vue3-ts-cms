<template>
  <router-view />
</template>

<script lang="ts">
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    /** 将本地数据设置到 vuex 中 */
    // store.dispatch('login/loadLocalLogin')
  },
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
