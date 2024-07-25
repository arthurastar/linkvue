<template>
  <div>
    <div v-if="loading">Carregando...</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <PostTitle :title="post.title.rendered" />
        <ImageGeneric :src="post.imageUrl" />
        <PostDescription :description="post.excerpt.rendered" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ImageGeneric from "@/components/ImageGeneric.vue";
import PostTitle from "@/components/PostTitle.vue";
import PostDescription from "@/components/PostDescription.vue";
import {withLoading} from '@/utils/withLoading';
import {useLoading} from '@/stores/loadingStore';
import {ref} from 'vue';

export default {
  name: 'WordPressImages',
  components: {
    PostDescription,
    ImageGeneric,
    PostTitle
  },
  setup() {
    const {loading} = useLoading();
    const posts = ref([]);

    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://linkconquista.com.br/wp-json/wp/v2/posts');
        const postsData = response.data;

        // Para cada post, buscar a imagem destacada se existir
        const postsWithImages = await Promise.all(postsData.map(async post => {
          if (post.featured_media) {
            const mediaResponse = await axios.get(`https://linkconquista.com.br/wp-json/wp/v2/media/${post.featured_media}`);
            post.imageUrl = mediaResponse.data.media_details.sizes.medium.source_url;
          } else {
            post.imageUrl = '';
          }
          return post;
        }));

        posts.value = postsWithImages;
      } catch (error) {
        console.error('Erro ao recuperar posts:', error);
      }
    };

    const executeWithLoading = withLoading(fetchPosts);

    return {
      loading,
      posts,
      executeWithLoading,
    };
  },
  created() {
    this.executeWithLoading();
  },
};
</script>

<style scoped>
/* Estilos opcionais para o indicador de carregamento */
</style>
