<script>
export default {
  props: {
    abbr: { type: Boolean, required: false },
  },
};
</script>
<template>
  <abbr
    v-if="abbr"
    title="picometre"
    v-tooltip="'picometre'"
    aria-label="picometre"
    >pm</abbr
  >
  <span v-else class="unit">pm</span>
</template>
