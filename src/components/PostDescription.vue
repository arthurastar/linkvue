<template>
  <div class="noticia-description" v-html="description"> </div>
</template>

<script>
export default {
  name: 'PostDescription',
  props: {
    description: {
      type: String,
      required: true
    }
  }
};
</script>

