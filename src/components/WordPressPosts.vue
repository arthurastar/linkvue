<template>
  <div class="container">
    <h1>Posts do WordPress</h1>
    <div class="row">
      <div class="col-sm-4" v-for="post in posts" :key="post.id">
        <PostTitle title="post.title.rendered"/>
        <PostDescription :description="post.excerpt.rendered" />
        <ImageGeneric :url="post.imageUrl" :description="post.title.rendered"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import Image from './Image.vue';
import ImageGeneric from "@/components/ImageGeneric.vue";
import PostTitle from "@/components/PostTitle.vue";
import PostDescription from "@/components/PostDescription.vue";
export default {
  name: 'WordPressImages',
  components: {
    PostDescription,
    ImageGeneric,
    PostTitle
  },
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('https://linkconquista.com.br/wp-json/wp/v2/posts');
        const posts = response.data;

        // Para cada post, buscar a imagem destacada se existir
        const postsWithImages = await Promise.all(posts.map(async post => {
          if (post.featured_media) {
            const mediaResponse = await axios.get(`https://linkconquista.com.br/wp-json/wp/v2/media/${post.featured_media}`);
            post.imageUrl = mediaResponse.data.media_details.sizes.medium.source_url;
          } else {
            post.imageUrl = '';
          }
          return post;
        }));

        this.posts = postsWithImages;
      } catch (error) {
        console.error('Erro ao recuperar posts:', error);
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 20px;
}
</style>