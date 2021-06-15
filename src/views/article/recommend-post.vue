<template>
  <div class="post-comment">
    <van-cell-group class="publish-wrap">
      <van-field
        class="post-field"
        v-model="postMessage"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="优质评论将会被优先展示"
        show-word-limit
      />
      <van-button 
      type="primary" 
      size="small"
      :disabled="!postMessage.trim()" 
      @click="onAddComment"
        >发布</van-button
      >
    </van-cell-group>
  </div>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "PostComment",
  components: {},
  props: {
    articleId: {
      type: [Number, String, Object],
      require: true,
    },
    art_id: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      postMessage: "",
      inputComment: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onAddComment() {
      // 1. 拿到数据
      const postMessage = this.postMessage;

      // 非空校验
      if (!postMessage) {
        return;
      }

      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "发布中...",
        forbidClick: true, // 是否禁止背景点击
      });

      try {
        // 2. 请求提交
        const { data } = await addComment({
          target: this.articleId.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.postMessage,
          art_id: this.art_id ? this.art_id.toString() : null, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        this.$emit("postSuccess", data.data.new_obj);
        // 清空文本框
        this.postMessage = "";

        this.$toast.success("发布成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("发布失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>