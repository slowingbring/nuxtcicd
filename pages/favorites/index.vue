<template>
  <div ui-view="" class="ng-scope">
    <div class="profile-page ng-scope">
      <!-- User's basic info & action buttons -->
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img class="user-img" :src="profile.image" />
              <h4 class="ng-binding">
                {{ profile.username }}
              </h4>
              <p class="ng-binding"></p>
              <button
                class="btn btn-sm action-btn ng-binding btn-outline-secondary"
                v-if="user.username !== profile.username"
                @click="profilesFollow(profile)"
              >
                <i class="ion-plus-round"></i>
                &nbsp; {{ profile.following ? "Unfollow" : "Follow" }}
                {{ profile.username }}
              </button>

              <nuxt-link
                v-else
                to="/settings"
                class="btn btn-sm btn-outline-secondary action-btn"
              >
                Edit Profile Settings</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <!-- Tabs for switching between author articles & favorites -->
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link
                    :to="{
                      path: '/favorites/' + $route.params.username,
                    }"
                    class="nav-link"
                    exact
                  >
                    My Articles</nuxt-link
                  >
                </li>
                <li class="nav-item">
                  <nuxt-link
                    :to="{
                      path: '/favorites/' + $route.params.username,
                      query: {
                        tab: 'Favorited Articles',
                      },
                    }"
                    class="nav-link"
                    exact
                  >
                    Favorited Articles</nuxt-link
                  >
                </li>
              </ul>
            </div>
            <base-list :articles="articles"></base-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseList from "../../components/BaseList.vue";
import { mapState } from "vuex";
import { getArticles } from "@/api/home.js";
import { getProfilesFollow } from "@/api/editor.js";
export default {
  components: { BaseList },
  async asyncData({ params, query }) {
    console.log('www')
    let tab = query.tab || "My Articles";
    let limit = 5,
      offset = 0;
    const username = params.username;
    let author, favorited;
    if (tab === "My Articles") {
      author = username;
    } else {
      favorited = username;
    }
    const [profiles, articlesData] = await Promise.all([
      getProfilesFollow(username),
      getArticles({
        limit,
        offset,
        author,
        favorited,
      }),
    ]);
    const { profile } = profiles.data;
    const { articles, articlesCount } = articlesData.data;

    return {
      profile,
      articles,
      articlesCount,
    };
  },
  watchQuery: ["tab"],
  middleware: "authenticated",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style></style>
