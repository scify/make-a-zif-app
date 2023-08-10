<script>
export default {
  methods: {
    showModal(modal) {
      const modalBtn = document.getElementById(`${modal}ModalBtn`);
      modalBtn.click();
    },
  },
};
</script>

<template>
  <div class="container-fluid mt-5 p-3 border border-accent documentation">
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
        and
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
      <li class="three">
        Click on
        <button type="button" class="btn inline disabled">Execute</button> to
        calculate the ZIF's diffusivity!
      </li>
    </ol>
    <div>
      This panel will allow you to review the diffusivity and the properties of
      all the ZIFs you have designed and either download or restore them.
    </div>
  </div>
</template>

<style lang="scss">
.documentation {
  h4 {
    font-weight: 700;
    color: var(--maz-text-accent);
  }
  ol {
    list-style-type: none;
    padding: 0 0.5rem;
    li {
      padding: 0.25rem 0;
      &.one::before,
      &.two::before,
      &.three::before {
        display: inline-block;
        width: 1.4rem;
        height: 1.4rem;
        line-height: 1.4rem;
        text-align: center;
        font-weight: 700;
        color: var(--maz-background);
        background: var(--maz-accent-darker);
        border-radius: 100%;
        margin-right: 0.5rem;
        font-size: 0.9rem;
      }
      &.one::before {
        content: "1";
      }
      &.two::before {
        content: "2";
      }
      &.three::before {
        content: "3";
      }
    }
  }
  button {
    transition: border-color 0.2s ease-in-out;
    &.btn.inline {
      display: inline-block;
      border-width: 2px;
      border-style: dotted;
      border-color: rgba(var(--maz-accent-darker-rgb), 0.4);
      border-top: none;
      border-left: none;
      border-right: none;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
      margin: 0 1px;
      text-align: inherit;
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      vertical-align: inherit;
      &:hover {
        border-color: rgba(var(--maz-accent-darker-rgb), 1);
      }
    }
  }
}
</style>
