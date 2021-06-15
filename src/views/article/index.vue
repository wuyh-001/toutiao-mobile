<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="文章详情"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div class="main-wrap">
      <!-- 加载中 -->
      <!-- <div class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div> -->

      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-if="!article.is_followed"
            @click="followEvent"
            :loading="isfollowedLoading"
            >关注</van-button
          >
          <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="followEvent"
            :loading="isfollowedLoading"
            >已关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="articleContent"
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <!-- 评论列表 -->
        <component-list
          :source="articleId"
          :list="commentList"
          @update-comment-total="totalCount = $event"
          @replayEvent="onReplyEvent"
        />

        <!-- 加载失败：404 -->
        <!-- <div class="error-wrap">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div> -->
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <!-- <div class="error-wrap">
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn">点击重试</van-button>
        </div> -->
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="totalCount" color="#777" />
      <van-icon
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        :color="article.attitude == 1 ? 'orange' : '#777'"
        :name="article.attitude == 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- 发布文章评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <post-comment :articleId="articleId" @postSuccess="onPostSuccess" />
    </van-popup>
    <!-- /发布文章评论 -->

    <!-- 回复评论 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 95%">
      <comment-reply
        @click-close="isReplyShow = false"
        :comment="currentComment"
        v-if="isReplyShow"
        :articleId="articleId"
      /> </van-popup
    >ƒ
    <!-- /回复评论 -->
  </div>
</template>
<script>
import "./github-markdown-css.css";
import {
  getArticleById,
  addCollect,
  addLike,
  deleteCollect,
  deleteLike,
} from "@/api/articles";
import { addFollow, cancelFollow } from "@/api/user";
import { ImagePreview } from "vant";
import ComponentList from "./component-list";
import PostComment from "./recommend-post";
import CommentReply from './comment-reply';
export default {
  name: "Article",
  components: {
    ComponentList,
    PostComment,
    CommentReply,
  },
  props: {
    articleId: {
      type: [Number, String],
      require: true,
    },
  },
  data() {
    return {
      article: {},
      isfollowedLoading: false,
      isPostShow: false,
      isReplyShow: false,
      commentList: [],
      totalCount: 0,
      currentComment:{}
    };
  },
  created() {
    this.loadArticle();
  },
  methods: {
    onReplyEvent(data) {
      this.currentComment=data;
      console.log(data)
      this.isReplyShow = true;
      console.log('ok')
    },
    onClickLeft() {
      this.$router.back();
    },
    async loadArticle() {
      try {
        const { data } = await getArticleById(this.articleId);
        this.article = data.data;
        let articleContent = this.$refs.articleContent;
        this.$nextTick(() => {
          let imgs = articleContent.querySelectorAll("img");
          const imgsPath = [];
          imgs.forEach((img, index) => {
            imgsPath.push(img.getAttribute("data-src"));
            img.setAttribute("src", img.getAttribute("data-src"));
            img.onclick = function () {
              console.log("ok");
              ImagePreview({
                images: imgsPath,
                startPosition: index,
              });
            };
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
    async followEvent() {
      this.isfollowedLoading = true;
      if (this.article.is_followed) {
        cancelFollow(this.article.aut_id);
      } else {
        addFollow(this.article.aut_id);
      }
      this.article.is_followed = !this.article.is_followed;
      this.isfollowedLoading = false;
    },

    async onCollect() {
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "操作中...",
        forbidClick: true, // 是否禁止背景点击
      });

      try {
        // 如果已收藏，则取消收藏
        if (this.article.is_collected) {
          await deleteCollect(this.articleId);
          // this.article.is_collected = false
          this.$toast.success("取消收藏");
        } else {
          // 添加收藏
          await addCollect(this.articleId);
          // this.article.is_collected = true
          this.$toast.success("收藏成功");
        }
        this.article.is_collected = !this.article.is_collected;
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败");
      }
    },
    async onLike() {
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "操作中...",
        forbidClick: true, // 是否禁止背景点击
      });

      try {
        // 如果已经点赞，则取消点赞
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId);
          this.article.attitude = -1;
          this.$toast.success("取消点赞");
        } else {
          // 否则添加点赞
          await addLike(this.articleId);
          this.article.attitude = 1;
          this.$toast.success("点赞成功");
        }
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败");
      }
    },
    onPostSuccess(data) {
      this.isPostShow = false;
      // 将最新发布的评论展示到列表的顶部
      this.commentList.unshift(data);
      this.totalCount++;
    },
  },
};
</script>
<style lang="less" scoped>
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 45px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 14px;
      padding: 12px 8px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 11px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 23px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 60px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 18px 0 22px;
    }
    .retry-btn {
      width: 140px;
      height: 36px;
      line-height: 36px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }
}
</style>