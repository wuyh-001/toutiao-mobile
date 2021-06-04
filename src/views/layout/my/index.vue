<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell class="base-info" title="单元格" value="内容">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div class="name" slot="title">{{currentUser.name}}</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="not-login" v-if="!user">
      <div>
        <!-- <img class="mobile" src="./手机.png"> -->
      </div>
      <div class="text" @click="loginClick">登录 / 注册</div>
    </div>
    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item icon-prefix="icon" icon="shoucang" text="文字" />
      <van-grid-item icon-prefix="icon" icon="lishi" text="文字" />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/" class="mb-4" />
    <van-cell
      v-if="user"
      title="退出登录"
      @click="logoutEvent"
      class="logout-cell"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getCurrentUserInfo } from "@/api/user";
export default {
  name: "My",
  data() {
    return {
      currentUser: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    loginClick() {
      this.$router.push("./login");
    },
    logoutEvent() {
      this.$dialog
        .confirm({
          title: "退出登录提示",
          message: "确认退出吗",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    async getUserInfo() {
      const res = await getCurrentUserInfo();
      this.currentUser=res.data.data;
    },
  },
};
</script>
<style scoped lang="less">
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/ .nav-grid {
    .van-grid-item {
      height: 70px;
      .icon {
        font-size: 22px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>