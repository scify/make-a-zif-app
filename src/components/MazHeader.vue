<script>
export default {
  props: {
    header: { type: String, required: true },
    subHeader: { type: String, required: false },
    modelVersion: { type: String, required: false },
  },
};
</script>

<template>
  <div class="greetings">
    <h2>{{ header }}</h2>
    <h3 v-if="subHeader">
      {{ subHeader }}
      <span v-if="modelVersion">(Model v{{ modelVersion }})</span>
    </h3>
  </div>
</template>
