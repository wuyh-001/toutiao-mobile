<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <div class="app-nav-bar">
        <van-search
          v-model="searchText"
          placeholder="请输入搜索关键词"
          shape="round"
          show-action
          @search="searhEvent(searchText)"
          @cancel="cancelEvent"
          @input="inputEvent"
          @clear="clearEvent"
        />
      </div>
    </form>
    <!-- 搜索结果 -->
    <result v-if="isShowResult" :searchText="searchText" />
    <!-- 模糊搜索 -->
    <suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="searhEvent"
    />
    <!-- 历史记录 -->
    <history :searchHistories="searchHistories" @search="searhEvent" @updateHistory="updateHistoryEvent" v-else />
  </div>
</template>
<script>
import Suggestion from "./suggestion";
import History from "./history";
import Result from "./result";
import {setItem,getItem} from '@/utils/storage';
export default {
  name: "Search",
  components: {
    Suggestion,
    History,
    Result,
  },
  data() {
    return {
      searchText: "",
      isShowResult: false,
      searchHistories: getItem('search-history') || [],
    };
  },
  methods: {
    searhEvent(txt) {
      console.log(txt);
      this.searchText = txt;
      this.isShowResult = true;
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(txt);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(txt);
      setItem('search-history',this.searchHistories)
    },
    cancelEvent() {
      this.$router.back();
    },
    inputEvent() {
      if (!this.searchText.trim()) {
        this.isShowResult = false;
      }
    },
    clearEvent() {
      this.searchText = "";
      this.isShowResult = false;
    },
    updateHistoryEvent(arr){
        this.searchHistories=arr;
        setItem('search-history',this.searchHistories)
    }
  },
};
</script>
<style lang="less" scoped>
.search-container {
  /deep/ .van-search {
    background-color: rgba(25, 137, 250, 0.85);
    .van-icon {
      color: #333;
    }
    .van-search__action {
      color: white;
    }
  }
}
</style>