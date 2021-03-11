<template>
  <div class="ng-isolate-scope">
    <nav>
      <ul class="pagination">
        <li
          class="page-item ng-scope"
          v-for="page in pages"
          :key="page"
          :class="{ active: pageList.page === page }"
        >
          <nuxt-link class="page-link ng-binding" :to="nxutLinkTo">{{
            page
          }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
    props: {
        pageList: {
            type: Object,
            required: true,
        },
        nxutLinkTo: {
            type: Object,
            required: true,
        },
    },
    computed: {
        pages() {
            return Math.ceil(this.pageList.articlesCount / this.pageList.limit);
        },
    },
};
</script>

<style></style>
