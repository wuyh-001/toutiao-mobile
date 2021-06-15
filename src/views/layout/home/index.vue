<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道菜单以及对应列表内容 -->
    <van-tabs v-model="active" v-if="channels.length > 0">
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="nav-pos"></div>
      <div
        slot="nav-right"
        @click="isChannelEditShow = true"
        class="nav-container"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 频道弹框 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      style="height: 100%"
    >
      <channel-edit
        :userChannel="channels"
        @close="closePopup"
        @updateActive="updateActive"
        :active="active"
      ></channel-edit>
    </van-popup>
  </div>
</template>
<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "@/components/article-list";
import ChannelEdit from "@/components/channel-edit";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  name: "Home",
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.getChannels();
  },
  methods: {
    async getChannels() {
      let channels = [];
      if (this.user) {
        const res = await getUserChannels();
        channels = res.data.data.channels ;
      } else {
        let userChannel = getItem("user-channels");
        if (userChannel) {
          channels = userChannel;
        } else {
          const res = await getUserChannels();
          channels = res.data.data.channels;
        }
      }
      this.channels = channels;
    },
    closePopup() {
      this.isChannelEditShow = false;
    },
    updateActive(index) {
      this.active = index;
    },
  },
};
</script>
<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-edit-popup {
    height: 100%;
  }
  .nav-pos {
    width: 33px;
    flex-shrink: 0;
  }
  .nav-container {
    position: fixed;
    right: 0px;
    width: 33px;
    height: 44px;
    font-size: 22px;
    background: rgba(255, 255, 255, 0.9);
    line-height: 44px;
    text-align: center;
  }
}
</style>