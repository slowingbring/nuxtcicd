<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? "Sign in" : "Sign up" }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link to="/register" v-if="isLogin">
              Need an account?
            </nuxt-link>
            <nuxt-link to="/login" v-else>
              Have an account?
            </nuxt-link>
          </p>
          <base-error :errorMsg="errorMsg"></base-error>

          <form @submit.prevent="submitForm">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                v-model="user.email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { login, register } from "@/api/user.js";
import BaseError from "../../components/BaseError.vue";
export default {
  components: { BaseError },
  name: "loginIndex",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errorMsg: {},
    };
  },
  middleware: "notAuthenticated",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    ...mapActions(["loginAction"]),
    async submitForm() {
      try {
        const { data } = await (this.isLogin
          ? login({ user: this.user })
          : register({ user: this.user }));

        this.loginAction(data.user);
        this.$router.push("/");
      } catch (error) {
        this.errorMsg = error.response.data.errors;
      }
    },
  },
};
</script>
