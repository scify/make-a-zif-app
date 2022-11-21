<script>
export default {
  props: {
    alt: {
      type: String,
      default: "Visualisation of a ZIF (zeolitic imidazolate framework)",
    },
  },
};
</script>

<template>
  <div class="col maz-image">
    <div class="maz-image--visualization" id="mazCanvas">
      <img
        class="img-fluid"
        loading="lazy"
        src="@/assets/zif-example.png"
        v-bind:alt="alt"
      />
    </div>
  </div>
</template>
