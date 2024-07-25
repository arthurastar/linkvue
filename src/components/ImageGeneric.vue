<template>
  <div>
    <h2>{{ description || 'Imagem Sem Descrição' }}</h2>
    <img :src="url" :alt="description || 'Imagem Sem Descrição'">
  </div>
</template>

<script>
export default {
  name: 'ImageGeneric',
  props: {
    url: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: ''
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
