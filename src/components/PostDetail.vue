<template>
  <div v-if="post">
    <h1>{{ post.title.rendered }}</h1>
    <img :src="post.imageUrl" :alt="post.title.rendered">
    <div v-html="post.content.rendered"></div>
    <a :href="{ name: 'PostList'}">Voltar para a lista</a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostDetail',
  props: ['id'],
  data() {
    return {
      post: null
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      try {
        const response = await axios.get(`https://linkconquista.com.br/wp-json/wp/v2/posts/${this.id}?_embed`);
        const post = response.data;

        if (post.featured_media) {
          const mediaResponse = await axios.get(`https://linkconquista.com.br/wp-json/wp/v2/media/${post.featured_media}`);
          post.imageUrl = mediaResponse.data.media_details.sizes.medium.source_url;
        } else {
          post.imageUrl = '';
        }

        this.post = post;
      } catch (error) {
        console.error('Erro ao recuperar post:', error);
      }
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
