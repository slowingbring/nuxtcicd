import Vue from "vue";
import {
  postFavoriteArticles,
  delFavoriteArticles,
  postProfilesFollow,
  delProfilesFollow,
} from "@/api/editor.js";

Vue.mixin({
  methods: {
    async favoriteArticle(item) {
      this.$set(item,'favoriteDisabled',true)
     
      if (item.favorited) {
        await delFavoriteArticles(item.slug);
        item.favorited = false;
        item.favoritesCount -= 1;
      } else {
        await postFavoriteArticles(item.slug);
        item.favorited = true;
        item.favoritesCount += 1;
      }
      this.$set(item,'favoriteDisabled',false)
    },
    async profilesFollow(item) {
      this.$set(item,'profilesDisabled',true)
    
      if (item.following) {
        await delProfilesFollow(item.username);
        item.following = false;
      } else {
        await postProfilesFollow(item.username);
        item.following = true;
      }
      this.$set(item,'profilesDisabled',false)
     
    },
  },
});
