<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <base-error :errorMsg="errorMsg"></base-error>
          <form @submit.prevent="submitForm">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseError from "../../components/BaseError.vue";
import { postArticles, putArticles, getArticlesSlug } from "@/api/editor.js";
export default {
  components: { BaseError },
  name: "editorIndex",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      errorMsg: {},
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
  },
  created() {
    if (this.slug) {
      this.getArticles();
    }
  },
  middleware:'authenticated',
  methods: {
    async submitForm() {
      try {
        const { data } = await (this.slug
          ? putArticles(this.slug, {
              article: this.article,
            })
          : postArticles({
              article: this.article,
            }));
        this.$router.push("/articles/" + data.article.slug);
      } catch (e) {
        this.errorMsg = e.response.data.errors;
      }
    },
    async getArticles() {
      try {
        const { data } = await getArticlesSlug(this.slug);
        const { body, title, description, tagList = [] } = data.article;

        this.article = {
          body,
          title,
          description,
          tagList,
        };
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
