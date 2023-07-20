<script>
export default {
  props: {
    abbr: { type: Boolean, required: false },
  },
};
</script>
<template>
  <abbr v-if="abbr" title="grams per mol" aria-label="grams per mol"
    >g/mol</abbr
  >
  <span v-else class="unit">g/mol</span>
</template>
