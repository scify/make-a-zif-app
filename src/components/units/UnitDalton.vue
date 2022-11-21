<script>
export default {
  props: {
    abbr: { type: Boolean, required: false },
  },
};
</script>
<template>
  <abbr v-if="abbr" title="dalton" aria-label="dalton">u</abbr>
  <span v-else class="unit">u</span>
</template>
