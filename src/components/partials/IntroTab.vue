<script>
export default {
  props: {
    ["selectedScenario"]: { required: true },
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
    <h4>How-to Make-a-ZIF</h4>
    <ol>
      <li class="one">
        Choose the ZIF's
        <button type="button" class="btn inline" @click="showModal('metal')">
          metal</button
        >,
        <button type="button" class="btn inline" @click="showModal('linkers')">
          organic linkers
        </button>
        &amp;
        <button type="button" class="btn inline" @click="showModal('groups')">
          functional groups</button
        >.
      </li>
      <li class="two">
        Select one of the
        <button type="button" class="btn inline" @click="showModal('gas')">
          Gases</button
        >.
      </li>
      <li :class="['three', 'highlight', { highlight: selectedScenario.gas }]">
        Click on
        <button
          :class="['btn', 'inline', { disabled: !selectedScenario.gas }]"
          @click="highlightEl('mazExecuteButton')"
          type="button"
        >
          Execution
        </button>
        to get a fast prediction of the diffusivity!
      </li>
    </ol>
  </div>
</template>
