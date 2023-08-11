<script>
import ExamplesTable from "@/components/partials/ExamplesTable.vue";

export default {
  components: {
    ExamplesTable,
  },
  emits: ["do:loadExampleScenario"],
  methods: {
    showModal(modal) {
      const modalBtn = document.getElementById(`${modal}ModalBtn`);
      modalBtn.click();
    },
    highlightEl(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("highlight");
        setTimeout(() => {
          element.classList.remove("highlight");
        }, 2000);
      }
    },
    loadExampleScenario(exampleScenario) {
      console.log("Examples Tab received loadExampleScenario...");
      this.$emit("do:loadExampleScenario", exampleScenario);
    },
  },
};
</script>
<template>
  <div
    class="container-fluid mt-4 px-3 pt-3 pb-1 border border-accent documentation"
  >
    <p>
      Replacing the building units in ZIFs (<button
        type="button"
        class="btn inline"
        @click="showModal('metal')"
      >
        metal</button
      >,
      <button type="button" class="btn inline" @click="showModal('linkers')">
        organic linkers
      </button>
      &amp;
      <button type="button" class="btn inline" @click="showModal('groups')">
        functional groups</button
      >), seems to have small impact on the structure. But don’t be fooled! The
      impact on diffusivities of various
      <button type="button" class="btn inline" @click="showModal('gas')">
        gases
      </button>
      can be great. Keep in mind that the larger the gas is, the larger the
      modification impact will be on its diffusivity. See some examples below to
      develop an intuition before you start playing with/using Make-a-ZIF.
    </p>

    <ExamplesTable
      title="The original ZIF-8"
      caption="Table 1. Basic structural units of the original ZIF-8<sup><em>1</em></sup>."
      reference="<sup><em>1</em></sup> The default ZIF model as defined by the Make-a-ZIF app."
      :gases="[
        { key: 'co2', diffusion: 5 },
        { key: 'ch4', diffusion: 0.57 },
      ]"
      @do:load-example-scenario="loadExampleScenario"
    />

    <ExamplesTable
      title="ZIF-8 with a different metal"
      caption="Table 2. ZIF-8 with Copper instead of Zinc."
      notes="Zinc has an ionic radius of 74 pm while Copper has an ionic radius of 71 pm. Swapping Zinc for Copper does not affect the aperture significantly (it is reduced from 3.46 Å to 3.2 Å), but the impact on diffusivities is big, especially for Methane that underwent a decrease of almost 100%."
      metal="cu"
      column-highlight="metal"
      :gases="[
        { key: 'co2', diffusion: 5 },
        { key: 'ch4', diffusion: 0.57 },
      ]"
      @do:load-example-scenario="loadExampleScenario"
    />

    <ExamplesTable
      title="ZIF-8 with a different organic linker"
      caption="Table 3. ZIF-8 with a bLm organic linker."
      notes="Let’s see what happens, if instead of the metal, one out of the three organic linkers is replaced with bLm: The aperture is reduced from 3.4 Å to 2.32 Å, and the diffusivities of Carbon Dioxide and Methane drop 2 and 6 orders of magnitude respectively!"
      linker3="blm"
      column-highlight="linker3"
      :gases="[
        { key: 'co2', diffusion: 5 },
        { key: 'ch4', diffusion: 0.57 },
      ]"
      @do:load-example-scenario="loadExampleScenario"
    />
  </div>
</template>
