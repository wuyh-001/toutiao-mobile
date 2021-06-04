<template>
  <div class="article-list">
    <van-pull-refresh 
    v-model="isRefreshLoading" 
    @refresh="onRefresh"
    :success-text="successText"
    :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item 
        :article="item"
        v-for="item in list" 
        :key="item.art_id"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from "@/api/articles.js";
import ArticleItem from './article-item'
export default {
  name: "ArticleList",
  components:{
      ArticleItem
  },
  props: {
    channel: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      timestamp: Date.now(),
      loading: false,
      finished: false,
      list: [],
      isRefreshLoading: false,
       successText:''
    };
  },
  created() {},
  methods: {
    async onLoad() {
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp,
        with_top: 1,
      });
      let { pre_timestamp, results } = res.data.data;
      this.list.push(...results);
      this.loading = false;
      if (results.length > 0) {
        this.timestamp = pre_timestamp;
      } else {
        this.finished = true;
      }
    },
    async onRefresh() {
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
       let {results } = res.data.data;
      this.list.unshift(...results);
      this.isRefreshLoading = false;
      this.successText=`更新了${results.length}条数据`
    },
  },
};
</script>
<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>