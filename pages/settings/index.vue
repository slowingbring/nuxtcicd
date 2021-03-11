<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <base-error :errorMsg="errorMsg"></base-error>
          <form @submit.prevent="submitForm">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="formData.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="formData.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="formData.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="formData.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="formData.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="quitLogin">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { updateUser } from "@/api/user.js";
import BaseError from "../../components/BaseError.vue";
export default {
  components: { BaseError },
  name: "settingsIndex",
  data() {
    return {
      formData: {
        bio: "",
        email: "",
        image: null,
        password: "",
        username: "",
      },
      errorMsg: {},
    };
  },
  created() {
    this.formData.email = this.user.email;
    this.formData.username = this.user.username;
  },
  middleware: "authenticated",
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["loginAction", "quitAction"]),
    async submitForm() {
      try {
        const { data } = await updateUser({
          user: this.formData,
        });
        this.loginAction(data.user);
        this.$router.push('/')
      } catch (error) {
        this.errorMsg = error.response.data.errors;
      }
    },
    quitLogin() {
      this.quitAction();
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
