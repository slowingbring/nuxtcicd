<template>
  <div>
    <base-error :errorMsg="errorMsg"></base-error>
    <form class="card comment-form" @submit.prevent="submitForm">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { postComment, getComment } from "@/api/editor.js";
import BaseError from "../../../components/BaseError.vue";
export default {
  components: { BaseError },
  name: "BaseSlugComment",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [], // 文章列表
      body: "",
      errorMsg: {},
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    async submitForm() {
      try {
        await postComment(this.article.slug, {
          comment: {
            body: this.body,
          },
        });

        this.body = "";
        this.getComments();
      } catch (error) {
        this.errorMsg = error.response.data.errors;
      }
    },
    async getComments() {
      const { data } = await getComment(this.article.slug);
      this.comments = data.comments;
    },
  },
};
</script>

<style></style>
