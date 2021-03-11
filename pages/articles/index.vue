<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <base-slug-meta :article="article"></base-slug-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <base-slug-meta :article="article"></base-slug-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <base-slug-comment :article="article"></base-slug-comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSlugMeta from "./components/BaseSlugMeta";
import BaseSlugComment from "./components/BaseSlugComment.vue";
import { getArticlesSlug } from "@/api/editor.js";
import MarkdownIt from "markdown-it";
export default {
  components: {
    BaseSlugMeta,
    BaseSlugComment,
  },
  middleware: "authenticated",
  async asyncData({ params }) {
    const { data } = await getArticlesSlug(params.slug);
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article,
    };
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style></style>
