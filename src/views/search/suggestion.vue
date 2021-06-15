<template>
  <div v-if="list.length > 0">
    <van-cell 
    v-for="(option, index) in list" 
    :key="index" icon="search"
    @click="$emit('search',option)"
    >
      <div slot="title" v-html="highlight(option)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSuggestionResult } from "@/api/serach";
import { debounce } from "lodash";
export default {
  name: "Suggestion",
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        const res = await getSuggestionResult(this.searchText);
        let { options } = res.data.data;
        this.list = options;
      }, 500),
      immediate: true,
    },
  },
  methods:{
      highlight(str){
          return str.replace(new RegExp(this.searchText,'gi'),`<span style="color:red;">${this.searchText}</span>`)
      }
  }
};
</script>
<style lang="less" scoped>
</style>