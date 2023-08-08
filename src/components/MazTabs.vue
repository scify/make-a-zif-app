<script>
export default {
  components: {},
  props: {
    ["scenarioResults"]: { required: true },
    ["scenarioHistory"]: { required: false, default: false },
  },
  emits: [
    "do:saveScenario",
    "do:deleteScenario",
    "do:downloadScenario",
    "do:loadScenario",
  ],
  data() {
    return {
      inputScenarioName: null,
      countSavedScenarios: 0,
    };
  },
  mounted() {},
  methods: {
    saveScenario() {
      let scenarioName = "Scenario";
      if (this.inputScenarioName) {
        scenarioName = this.inputScenarioName.trim();
        // Strips (supposedly) a lot of special characters:
        scenarioName = scenarioName.replace(
          /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi,
          ""
        );
        // Enforcing a 20-character limit as desktop view has limited width:
        if (scenarioName.length > 20) {
          scenarioName = scenarioName.substring(0, 20);
        }
      } else {
        // Since we are trying to set a "Scenario n" name, lets at least try to
        // set a meaningful number. For that, we first have to count the amount
        // of scenarios that the user has already saved.
        if (this.scenarioHistory) {
          if (this.scenarioHistory.length) {
            this.countSavedScenarios = this.scenarioHistory.length;
          }
        }
        this.countSavedScenarios++;
        scenarioName = `${scenarioName} ${this.countSavedScenarios}`;
      }
      console.log("Trying to save Scenario with name: " + scenarioName);
      this.$emit("do:saveScenario", scenarioName);
    },
  },
};
</script>

<template>
  <div class="introduction mt-4 mb-1 pt-2 pb-1">
    <div class="maz-tabs" role="navigation">
      <ul id="mazIntroTabs" class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active pt-3 px-md-5 px-4"
            id="mazIntroTab"
            data-bs-toggle="tab"
            data-bs-target="#mazIntroPane"
            type="button"
            role="tab"
            aria-controls="mazIntroPane"
            aria-selected="true"
          >
            Intro
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link pt-3 px-md-4 px-4"
            id="mazExamplesTab"
            data-bs-toggle="tab"
            data-bs-target="#mazExamplesPane"
            type="button"
            role="tab"
            aria-controls="mazExamplesPane"
            aria-selected="false"
          >
            Examples
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link pt-3 px-md-4 px-4"
            id="mazHistoryTab"
            data-bs-toggle="tab"
            data-bs-target="#mazHistoryPane"
            type="button"
            role="tab"
            aria-controls="mazHistoryPane"
            aria-selected="false"
          >
            History
          </button>
        </li>
      </ul>
    </div>

    <div class="tab-content maz-tab-content" id="mazTabContent">
      <div
        id="mazIntroPane"
        class="tab-pane fade show active"
        role="tabpanel"
        aria-labelledby="mazIntroTab"
        tabindex="0"
      >
        <div class="container-fluid mt-5 p-3 border border-accent">
          1 Choose from a displayed pop-up list the material you want. 2 Choose
          from a displayed pop-up list the fume you want. 3 Choose from a
          displayed pop-up list the material you want. 4 Choose from a displayed
          pop-up list the fume you want. In the History section you can always
          see see the metrics of the last inputs you run. In the Historicity
          section listed the saved scenarios which you can export in a excel
          file or restore one of the scenarios you’ve saved.
        </div>
      </div>
      <div
        id="mazExamplesPane"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="mazExamplesTab"
        tabindex="0"
      >
        <div class="container-fluid mt-5 p-3">
          Replacing the units (metal, organic linker and functional group) in
          ZIFs, seems to have small impact on the structure. But don’t be
          fooled! The impact on diffusivities of various gases can be great.
          Keep in mind that the larger the gas is, the larger the modification
          impact will be on its diffusivity. See some examples below to develop
          an intuition before you start playing with/using make-a-ZIF.
        </div>
      </div>
      <div
        id="mazHistoryPane"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="mazHistoryTab"
        tabindex="0"
      >
        <div class="container-fluid mt-5 p-0 log">
          <div class="zif-history d-flex flex-wrap">
            <div class="zif">
              <div class="zif--header">Generated ZIF with diffusivity:</div>
              <div class="zif--diffusivity">-14.560773849487305</div>
              <div class="zif--units d-flex flex-wrap">
                <div class="unit flex-grow-1">
                  <dl>
                    <dt>Metal</dt>
                    <dd>Zn</dd>
                  </dl>
                </div>
                <div class="unit">
                  <dl>
                    <dt>Organic linkers</dt>
                    <dd>mLm mLm mLm</dd>
                  </dl>
                </div>
                <div class="unit flex-grow-1">
                  <dl>
                    <dt>Functional groups</dt>
                    <dd>–CHO –CHO –CHO</dd>
                  </dl>
                </div>
                <div class="unit">
                  <dl>
                    <dt>Gas</dt>
                    <dd>CO2</dd>
                  </dl>
                </div>
              </div>
              <div class="zif--date">Date: March 12, 2005, 05:34:34</div>
              <div class="zif--actions d-flex">
                <button class="btn btn-sm btn-primary m-1 flex-fill">
                  Save
                </button>
                <button class="btn btn-sm btn-secondary m-1">Restore</button>
                <button class="btn btn-sm btn-outline-primary m-1">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.zif {
  padding: 5px;
  max-width: 250px;
  font-size: 1em;
  overflow: hidden;
  border: 2px solid #000;
  &--header {
    text-align: center;
    opacity: 0.9;
  }
  &--diffusivity {
    font-weight: 700;
    max-width: 250px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    font-size: 2em;
  }
  &--units {
    font-size: 1em;
    .unit {
      padding: 0.25em;
      dl,
      dd,
      dt {
        margin: 0;
        padding: 0;
      }
    }
  }
  &--date {
    text-align: center;
    opacity: 0.8;
    font-size: 0.8em;
  }
  &--actions {
    button {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
