<template>
  <div class="datetime-label">
    <h4>{{ value }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>