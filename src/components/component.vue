<template>
  <div>
    <button @click="executeWithLoading">Execute Function</button>
    <div v-if="loading">Loading...</div>
    <!-- Seu conteúdo -->
  </div>
</template>

<script>


export default {
  setup() {
    const { loading } = useLoading();

    async function yourFunction() {
      // Simulação de uma operação assíncrona, como uma chamada de API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("done");
        }, 2000);
      });
    }

    const executeWithLoading = withLoading(yourFunction);

    return {
      loading,
      executeWithLoading,
    };
  },
};
</script>

<style scoped>
/* Estilos opcionais para o indicador de carregamento */
</style>