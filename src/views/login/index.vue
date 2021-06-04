<template>
  <div class="login-wrapper">
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登陆"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form
      ref="loginForm"
      :show-error-message="false"
      :show-error="false"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
        name="code"
      >
        <template #button>
          <van-button
            v-if="!isShow"
            size="mini"
            round
            class="send-code"
            @click.prevent="sendSms"
            :disabled="disabled"
          >
            发送验证码
          </van-button>
          <van-count-down 
          :time="time" 
          format="ss s" 
          v-if="isShow"
          @finish="finishEvent" 
          />
        </template>
      </van-field>
      <div class="login-btn">
        <van-button type="info" block>登陆</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, sendSms } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      time: 1000 * 5,
      isShow: false,
      disabled:false,
      user: {
        // mobile: "13911111111",
        mobile: "17090086870",
        code: "246810",
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号码",
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "手机号码格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async onLogin() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      try {
        const res = await login(this.user);
        Toast.success("登陆成功");
        this.$store.commit('setUser',res.data.data)
        // 暂时的处理方法
        this.$router.back();
      } catch (e) {
        Toast.fail("登陆失败");
      }
    },
    onFailed(info) {
      if (info.errors[0]) {
        Toast({
          message: info.errors[0].message,
          position: "top",
        });
      }
    },
    async sendSms() {
      try {
        await this.$refs.loginForm.validate("mobile");
        this.disabled=true;
        await sendSms(this.user.mobile);
        this.isShow=true;
      } catch (err) {
        let message = "";
        if (err && err.response && err.response.status == 429) {
          message = "发送太频繁了～～，请稍后在试！";
        } else if (err.name == "mobile") {
          message = err.message;
        } else {
          message = "发送失败，请稍后再试！";
        }
        Toast({
          message,
          position: "top",
        });
      };
       this.disabled=false;
    },
    finishEvent(){
        this.isShow=false;
    }
  },
};
</script>
<style scoped lang="less">
.send-code {
  padding: 8px;
  background-color: #ededed;
}
.login-btn {
  padding: 26px 16px;
  .van-button--info {
    background-color: rgba(25, 137, 250, 0.6);
    border: none;
  }
}
</style>