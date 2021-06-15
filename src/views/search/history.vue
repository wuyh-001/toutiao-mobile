<template>
  <div class="search-history">
    <van-cell title="暂无搜索历史" v-if="!searchHistories.length" />
    <van-cell title="搜索历史" v-if="searchHistories.length > 0">
      <div v-if="isShowDelete">
        <span @click="deleteAll">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isShowDelete = false">完成</span>
      </div>
      <van-icon name="delete" @click="isShowDelete = true" v-else></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="deleteitem(item, index)"
    >
      <van-icon
        name="close"
        v-if="isShowDelete"
      ></van-icon>
    </van-cell>
  </div>
</template>
<script>
import {setItem,getItem} from '@/utils/storage';
export default {
  name: "History",
  props: {
    searchHistories: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isShowDelete: false,
    };
  },
  methods: {
    deleteitem(history, index) {
      if (this.isShowDelete) {
        this.searchHistories.splice(index, 1);
        setItem('search-history',this.searchHistories)
      } else {
        this.$emit("search", history);
      }
    },
    deleteAll(){
         this.$emit('updateHistory',[])
    }
  },
};
</script>
<style lang="less" scoped>
</style>