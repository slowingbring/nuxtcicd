<!--  -->
<template>
  <div>
    <base-header></base-header>
    <nuxt />
    <base-footer></base-footer>
  </div>
</template>

<script>
import BaseHeader from "./components/BaseHeader.vue";
import BaseFooter from "./components/BaseFooter.vue";
export default {
  components: { BaseHeader, BaseFooter },
};
</script>

<style></style>
