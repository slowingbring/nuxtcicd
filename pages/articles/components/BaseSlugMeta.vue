<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        path: '/favorites',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: '/favorites',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
  
      <!-- If current user is the author, show edit/delete buttons -->
      <span class="ng-scope" v-if="isOneSelf">
       
          <nuxt-link
            class="btn btn-outline-secondary btn-sm"
            :to="{
              path: '/editor',
              params: {
                slug: article.slug,
              },
            }"
          >
            <i class="ion-edit"></i> Edit Article
          </nuxt-link>

          <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
            <i class="ion-trash-a"></i> Delete Article
          </button>
       
      </span>
       <template v-else>
          <button
            class="btn btn-sm btn-outline-secondary"
            :class="{
              active: author.following,
            }"
            :disabled="author.favoriteDisabled"
            @click="profilesFollow(author)"
          >
            <i class="ion-plus-round"></i>
            &nbsp; {{ author.following ? "Unfollow" : "Follow" }}
            {{ author.username }}
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-primary"
            :class="{
              active: article.favorited,
            }"
            :disabled="article.profilesDisabled"
            @click="profilesFollow(article)"
          >
            <i class="ion-heart"></i>
            &nbsp;{{ article.favorited ? "Unfavorite" : "Favorite" }}
            {{ author.username }}
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </template>
    
  </div>
</template>

<script>
import { delArticles } from "@/api/editor";
import { mapState } from "vuex";
export default {
  name: "BaseSlugMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    author() {
      return this.article.author || {};
    },
    isOneSelf() {
      return this.author.username === this.user.username;
    },
    ...mapState(["user"]),
  },
  methods: {
    async deleteArticle() {
      try {
        await delArticles(article.slug);
        this.$router.push("/");
      } catch (error) {}
    },
  },
};
</script>

<style></style>
