<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link "
                  exact
                  :class="{ active: tab === 'user' }"
                  :to="{ name: 'home' }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link "
                  :class="{ active: tab === 'global' }"
                  :to="{
                    name: 'home',
                    query: { tab: 'global' },
                  }"
                >
                  Global Feed</nuxt-link
                >
              </li>

              <li class="nav-item" v-if="tab === 'tag'">
                <nuxt-link
                  class="nav-link  active"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag,
                    },
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <base-list :articles="articles"></base-list>
        </div>

        <div class="ng-isolate-scope">
          <nav>
            <ul class="pagination">
              <li
                class="page-item ng-scope"
                v-for="page in pages"
                :key="page"
                :class="{ active: pageList.page === page }"
              >
                <nuxt-link
                  class="page-link ng-binding"
                  :to="{
                    name: 'home',
                    query: {
                      page,
                      tab,
                      tag,
                    },
                  }"
                  >{{ page }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="(tag, index) in tags"
                :key="index"
                :to="{
                  name: 'home',
                  query: { tag, tab: 'tag' },
                }"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseList from "../../components/BaseList.vue";
import BasePages from "../../components/BasePages.vue";
import { getArticles, getTags } from "@/api/home";
export default {
  name: "homeIndex",
  components: { BaseList, BasePages },
  async asyncData({ store, query }) {
    const limit = 10;
    const page = Number(query.page) || 1;
    const tag = query.tag;
    let tab = query.tab;
    let author;
    const user = store.state.user;
    if (user && !tab) {
      author = user.username;
      tab = "user";
    }

    const [articleRes, tagRes] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * limit,
        author,
        tag,
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;

    return {
      articles,
      tags,
      tab,
      tag,
      user,
      pageList: {
        page,
        limit,
        articlesCount,
      },
    };
  },
  watchQuery: ["page", "tab", "tag"],
  computed: {
    pages() {
      return Math.ceil(this.pageList.articlesCount / this.pageList.limit);
    },
  },
};
</script>

<style></style>
