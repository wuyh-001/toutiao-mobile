<template>
  <div class="result-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>
<script>
import { getResults } from "@/api/serach";
export default {
  name: "Result",
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
    };
  },
  created() {
    //   this.getResultList();
  },
  methods: {
    async onLoad() {
      const { data } = await getResults({
        page: this.page,
        per_page: 20,
        q: this.searchText,
      });
      // 2. 将数据添加到列表中
      const { results } = data.data;
      this.list.push(...results);
      // 3. 设置加载状态结束
      this.loading = false;
      // 4. 判断数据是否加载完毕
      if (results.length) {
        this.page++; // 更新获取下一页数据的页码
      } else {
        this.finished = true; // 没有数据了，将加载状态设置结束，不再 onLoad
      }
    },
  },
};
</script>
<style lang="less" scoped>
.result-container{
    position: fixed;
    left: 0;
    top: 54px;
    height: 100%;
    overflow: auto;
}
</style>