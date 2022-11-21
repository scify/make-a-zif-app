<script>
export default {
  props: {
    abbr: { type: Boolean, required: false },
  },
};
</script>
<template>
  <abbr v-if="abbr" title="nanometre" aria-label="nanometre">nm</abbr>
  <span v-else class="unit">nm</span>
</template>
