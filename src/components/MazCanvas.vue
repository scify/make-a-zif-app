<template>
  <div class="col maz-image">
    <div class="maz-image--visualization" id="mazCanvas">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>


<script>
import p5 from "p5";

export default {
  props: {
    alt: {
      type: String,
      default: "Visualisation of a ZIF (zeolitic imidazolate framework)",
    },
  },
  data() {
    return {
      // Define a canvas element for p5.js
      canvas: null,
    };
  },
  methods: {
    setup() {
      const canvasEl = this.$refs.canvas;
      const sketch = (s) => {
        s.setup = () => {
          s.createCanvas(480, 540, canvasEl);
          s.background(0);
        };
      };
      let d;
      d = new p5(sketch, "canvas");
      this.canvas = d;
    },
  },
  mounted() {
    this.setup();
  },
  beforeMount() {
  },
  beforeUnmount() {
    this.canvas.remove();
  },
};
</script>

