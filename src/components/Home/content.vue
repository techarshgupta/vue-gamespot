<template>
    <div class="container">
        <div class="home_container">
            <md-card v-for="(post, index) in posts" :key="index">
                <md-card-media md-ratio="4:3">
                    <img :src="post.img">
                </md-card-media>

                <md-card-header>
                    <h2 class="md-title">{{post.title}}</h2>
                    <div class="md-subhead">
                        <div>{{post.desc}}</div>
                    </div>
                </md-card-header>

                <md-card-actions>
                    <app-button type="link" :linkTo="`/post/${post.id}`" :addClass="['small_link']">See Review</app-button>
                </md-card-actions>
            </md-card>
        </div>

        <div class="load_more">
            <app-button type="btn" :addClass="['small_link']" :action="loadMore">
                Load More
            </app-button>
        </div>
    </div>
</template>

<script>
//import posts from '../../assets/posts'

    export default {
        name: "content",
        computed: {
            posts() {
                return this.$store.getters['posts/getAllPosts']
            }
        },
        created() {
            this.$store.dispatch('posts/getAllPosts', {
                limit: 3
            })
        },
        methods: {
            loadMore() {
                this.$store.dispatch('posts/getAllPosts', {
                    limit: this.posts.length + 3
                })
            }
        }
    }
</script>

<style scoped>

</style>