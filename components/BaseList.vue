<template>
    <div>
        <div class="article-preview" v-for="item in articles" :key="item.slug">
            <div class="article-meta">
                <nuxt-link class="author" :to="{path: '/favorites/' + item.author.username}">
                    <img :src="item.author.image" />
                </nuxt-link>
                <div class="info">
                    <nuxt-link class="author" :to="{path: '/favorites/' + item.author.username}">
                        {{ item.author.username }}
                    </nuxt-link>
                    <span class="date">{{ item.createdAt | date("MMM DD, YYYY") }}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{ active: item.favorited }" @click="favoriteArticle(item)" :disabled="item.favoriteDisabled">
                    <i class="ion-heart"></i> {{ item.favoritesCount }}
                </button>
            </div>
                <nuxt-link :to="'/articles/' + item.slug" class="preview-link">
                <h1>{{ item.title }}</h1>
                <p>{{ item.description }}</p>
                <span>Read more...</span>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        articles: {
            type: Array,
            required: true,
        },
    },
    methods: {},
};
</script>

<style></style>
