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
    title="ångström"
    v-tooltip="'ångström'"
    aria-label="angstrom"
    >&Aring;</abbr
  >
  <span v-else class="unit">&Aring;</span>
</template>
