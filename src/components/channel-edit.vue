<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain @click="onEdit">{{
        isEdit ? "完成" : "编辑"
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        :class="{ active: active == index }"
        :icon="isEdit && index !== 0 ? 'close' : ''"
        v-for="(item, index) in userChannel"
        :key="item.id"
        :text="item.name"
        @click="channelClick(item, index)"
      />
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        @click="onAdd(item)"
      />
    </van-grid>
  </div>
</template>


<script>
import {
  getAllChannels,
  setUserChannels,
  deleteUserChannels,
} from "@/api/channels.js";
import { setItem } from "@/utils/storage";
import { mapState } from "vuex";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannel: {
      type: Array,
      require: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
    };
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.userChannel.find((channel) => {
          return channel.id == item.id;
        });
      });
    },
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.getChannels();
  },
  mounted() {},
  methods: {
    async getChannels() {
      const res = await getAllChannels();
      let { channels } = res.data.data;
      this.allChannels = channels;
    },
    async onAdd(item) {
      this.userChannel.push(item);
      if (this.user) {
        await setUserChannels({
          channels: [{ id: item.id, seq: this.userChannel.length }],
        });
      } else {
        setItem("user-channels", this.userChannel);
      }
    },
    onEdit() {
      this.isEdit = !this.isEdit;
    },
    channelClick(item, index) {
      console.log("1111");
      if (this.isEdit && index !== 0) {
        // 如果是编辑状态，，则删除
        this.deleteChannel(item, index);
      } else {
        // 如果是完成状态，则跳转到相应的频道
        this.switchChannel(index);
      }
    },
    async deleteChannel(item, index) {
      if (index <= this.active) {
        this.$emit("updateActive", this.active - 1);
      }
      this.userChannel.splice(index, 1);
      if (this.user) {
        await deleteUserChannels(item.id);
      } else {
        setItem("user-channels", this.userChannel);
      }
    },
    switchChannel(index) {
      this.$emit("close");
      this.$emit("updateActive", index);
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
  .channel-item {
    height: 46px;
    // width: 80px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      padding: 2px;
      position: relative;
      .van-grid-item__text {
        color: #222;
        font-size: 12px;
        margin-top: 0px;
      }
      .van-icon-close {
        position: absolute;
        right: -8px;
        top: -10px;
        font-size: 20px;
      }
    }
    &.active {
      /deep/ .van-grid-item__text {
        color: red;
      }
    }
  }
}
</style>