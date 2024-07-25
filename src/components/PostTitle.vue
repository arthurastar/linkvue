<template>
  <h2>{{ title }}</h2>
</template>

<script>
export default {
  name: 'PostTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

