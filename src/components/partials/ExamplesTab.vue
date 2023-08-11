<script>
import ExamplesTable from "@/components/partials/ExamplesTable.vue";
export default {
  components: {
    ExamplesTable,
  },
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
  },
};
</script>
<template>
  <div
    class="container-fluid mt-4 px-3 pt-3 pb-1 border border-accent documentation"
  >
    <p>
      Replacing the structural units (
      <button type="button" class="btn inline" @click="showModal('metal')">
        metal</button
      >,
      <button type="button" class="btn inline" @click="showModal('linkers')">
        organic linkers
      </button>
      &amp;
      <button type="button" class="btn inline" @click="showModal('groups')">
        functional groups</button
      >.) in ZIFs, seems to have small impact on the structure. But don’t be
      fooled! The impact on diffusivities of various
      <button type="button" class="btn inline" @click="showModal('gas')">
        gases
      </button>
      can be great. Keep in mind that the larger the gas is, the larger the
      modification impact will be on its diffusivity. See some examples below to
      develop an intuition before you start playing with/using Make-a-ZIF.
    </p>

    <h5>Starting from the original ZIF-8</h5>
    <ExamplesTable />
  </div>
</template>
