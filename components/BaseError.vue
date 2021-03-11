<template>
  <ul class="error-messages" v-if="errorMsg">
    <template v-for="(messages, key) in errorMsg">
      <li v-for="(message, index) in messages" :key="index">
        {{ key }} {{ message }}
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: "BaseError",
  props: {
    errorMsg: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
