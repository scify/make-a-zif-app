<script>
import { nextTick } from "vue";
import IntroTab from "./partials/IntroTab.vue";

export default {
  components: {
    IntroTab,
  },
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
    parseMetal(key) {
      const metal = key
        ? this.$root["listOfMetals"].find((i) => i.key === key)
        : null;
      return metal ? metal.title : "None";
    },
    parseLinker(key) {
      const linker = key
        ? this.$root["listOfLinkers"].find((i) => i.key === key)
        : null;
      return linker ? linker.name : "None";
    },

    parseGroup(key) {
      const group = key
        ? this.$root["listOfGroups"].find((i) => i.key === key)
        : null;
      return group ? this.parseSubScript(group.name) : "None";
    },

    parseGas(key) {
      const gas = key
        ? this.$root["listOfGases"].find((i) => i.key === key)
        : null;
      return gas ? gas.title : "None";
    },

    /**
     * Parses <sub>digit</sub> and returns the corresponding JavaScript friendly
     * unicode character. E.g. <sub>2</sub> becomes \u2082.
     * @param unit A unit which might contain <sub>scripts.
     * @returns {string} The unit in plain unicode friendly text.
     */
    parseSubScript(unit) {
      return unit.replace(/<sub>(\d)<\/sub>/g, (match, digit) => {
        const unicodeCode = 0x2080 + parseInt(digit);
        return String.fromCharCode(unicodeCode);
      });
    },

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
        // As the inputScenarioName no longer exists (probably) we have to
        // create a fancy name by ourselves like "Scenario n". For that, we
        // first have to count the amount of scenarios that the user has already
        // saved.
        if (this.scenarioHistory) {
          if (this.scenarioHistory.length) {
            this.countSavedScenarios = this.scenarioHistory.length;
            let tempScenarioName = `${scenarioName} ${
              this.countSavedScenarios + 1
            }`;
            // But, yes, that might be an issue if user has only a "Scenario 2"
            // saved & we are trying to save a 2nd one, which would have the
            // exact same name. So, let's just take the latest scenario...
            const existingScenario = this.scenarioHistory.find(
              (i) => i.name === tempScenarioName
            );
            let plusCount = 1;
            if (existingScenario) {
              plusCount++;
            }
            scenarioName = `${scenarioName} ${
              this.countSavedScenarios + plusCount
            }`;
          }
        } else {
          scenarioName = `${scenarioName} 1`;
        }
        this.countSavedScenarios++;
      }
      console.log("Trying to save Scenario with name: " + scenarioName);
      this.$emit("do:saveScenario", scenarioName);
    },
  },
  watch: {
    scenarioResults: {
      handler() {
        if (
          this.scenarioResults.scenario &&
          Object.keys(this.scenarioResults.scenario).length > 0
        ) {
          if (this.scenarioResults.showDiff && this.scenarioResults.showSave) {
            nextTick(() => {
              document.querySelector("#generatedZif").classList.add("new");
              setTimeout(() => {
                document.querySelector("#generatedZif").classList.remove("new");
                document
                  .querySelector("#mazExecuteButton")
                  .classList.remove("disabled");
              }, 2500); // Adjust timing as needed
            });
          }
        }
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div class="introduction mt-4 mb-1 pt-2 pb-1">
    <div class="maz-tabs" role="navigation">
      <ul id="mazTabs" class="nav nav-tabs" role="tablist">
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

    <div id="mazTabPanels" class="tab-content maz-tab-content">
      <div
        id="mazIntroPane"
        class="tab-pane fade show active"
        role="tabpanel"
        aria-labelledby="mazIntroTab"
        tabindex="0"
      >
        <IntroTab />
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
        <div class="container mt-5 p-0 log">
          <div
            class="zif-history row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 gx-sm-5 gy-5 gx-0"
          >
            <!-- memo starts here -->
            <template
              v-if="
                scenarioResults &&
                (scenarioResults.showDiff || scenarioResults.showStatus)
              "
            >
              <!-- zif starts here -->
              <div class="col">
                <div
                  :class="[
                    'zif',
                    'memo',
                    { loading: scenarioResults.showStatus },
                    {
                      'd-none':
                        !scenarioResults.showDiff &&
                        !scenarioResults.showStatus,
                    },
                  ]"
                  id="generatedZif"
                >
                  <div class="zif--header">
                    {{
                      scenarioResults.showDiff
                        ? "Generated ZIF diffusivity:"
                        : "Generating ZIF"
                    }}
                  </div>
                  <div class="zif--diffusivity">
                    <span v-if="scenarioResults.showDiff">
                      {{ scenarioResults.diffusion }}
                    </span>
                    <span v-if="scenarioResults.showStatus">
                      {{ scenarioResults.status }}
                    </span>
                  </div>
                  <div class="zif--units d-grid d-flex flex-wrap gap-0">
                    <div class="unit flex-grow-1">
                      <dl>
                        <dt>Metal</dt>
                        <dd class="text-capitalize">
                          {{ this.parseMetal(scenarioResults.scenario.metal) }}
                        </dd>
                      </dl>
                    </div>
                    <div class="unit">
                      <dl>
                        <dt>Organic linkers</dt>
                        <dd>
                          {{
                            this.parseLinker(scenarioResults.scenario.linker1)
                          }}
                          {{
                            this.parseLinker(scenarioResults.scenario.linker2)
                          }}
                          {{
                            this.parseLinker(scenarioResults.scenario.linker3)
                          }}
                        </dd>
                      </dl>
                    </div>
                    <div class="unit flex-grow-1">
                      <dl>
                        <dt>Functional groups</dt>
                        <dd>
                          {{
                            this.parseGroup(scenarioResults.scenario.funcGroup1)
                          }}
                          {{
                            this.parseGroup(scenarioResults.scenario.funcGroup2)
                          }}
                          {{
                            this.parseGroup(scenarioResults.scenario.funcGroup3)
                          }}
                        </dd>
                      </dl>
                    </div>
                    <div class="unit">
                      <dl>
                        <dt>Gas</dt>
                        <dd class="text-capitalize">
                          {{ this.parseGas(scenarioResults.scenario.gas) }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div class="zif--date">
                    Date:
                    <time v-bind:datetime="scenarioResults.date">{{
                      scenarioResults.formattedDate
                    }}</time>
                  </div>
                  <div class="zif--actions d-grid gap-2 d-md-flex">
                    <button
                      v-if="scenarioResults.showDiff"
                      :class="[
                        'btn',
                        'btn-sm',
                        'btn-primary',
                        'flex-fill',
                        { disabled: !scenarioResults.showSave },
                      ]"
                      :disabled="!scenarioResults.showSave"
                      @click="saveScenario"
                      class="btn btn-sm btn-primary flex-fill"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Save the scenario & its results to your history"
                      type="button"
                    >
                      {{ scenarioResults.showSave ? "Save" : "Saved!" }}
                    </button>
                    <button
                      v-if="!scenarioResults.showDiff"
                      class="btn btn-sm btn-primary disabled flex-fill"
                      disabled
                    >
                      ...
                    </button>
                  </div>
                </div>
              </div>
              <!-- /zif ends here -->
            </template>
            <!-- /memo ends here -->

            <!-- history starts here -->
            <template v-if="scenarioHistory">
              <template
                v-for="(scenario, key) in scenarioHistory.slice().reverse()"
                :key="key"
              >
                <!-- zif starts here -->
                <div class="col">
                  <div class="zif scenario" :id="`saved-scenario-${key}`">
                    <div class="zif--header">
                      ZIF {{ scenario.name }} diffusivity:
                    </div>
                    <div class="zif--diffusivity">{{ scenario.diffusion }}</div>
                    <div class="zif--units d-grid d-flex flex-wrap gap-0">
                      <div class="unit flex-grow-1">
                        <dl>
                          <dt>Metal</dt>
                          <dd class="text-capitalize">
                            {{ this.parseMetal(scenario.scenario.metal) }}
                          </dd>
                        </dl>
                      </div>
                      <div class="unit">
                        <dl>
                          <dt>Organic linkers</dt>
                          <dd>
                            {{ this.parseLinker(scenario.scenario.linker1) }}
                            {{ this.parseLinker(scenario.scenario.linker2) }}
                            {{ this.parseLinker(scenario.scenario.linker3) }}
                          </dd>
                        </dl>
                      </div>
                      <div class="unit flex-grow-1">
                        <dl>
                          <dt>Functional groups</dt>
                          <dd>
                            {{ this.parseGroup(scenario.scenario.funcGroup1) }}
                            {{ this.parseGroup(scenario.scenario.funcGroup2) }}
                            {{ this.parseGroup(scenario.scenario.funcGroup3) }}
                          </dd>
                        </dl>
                      </div>
                      <div class="unit">
                        <dl>
                          <dt>Gas</dt>
                          <dd class="text-capitalize">
                            {{ this.parseGas(scenario.scenario.gas) }}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div class="zif--date">
                      Date:
                      <time v-bind:datetime="scenario.date">{{
                        scenario.formattedDate
                      }}</time>
                    </div>
                    <div class="zif--actions d-grid gap-2 d-md-flex">
                      <button
                        class="btn btn-sm btn-primary flex-fill"
                        @click="$emit('do:loadScenario', scenario.date)"
                      >
                        Restore
                      </button>
                      <button
                        class="btn btn-sm btn-primary"
                        @click="$emit('do:downloadScenario', scenario.date)"
                      >
                        Download
                      </button>
                      <button
                        class="btn btn-sm btn-outline-primary"
                        @click="$emit('do:deleteScenario', scenario.date)"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <!-- / zif ends here -->
              </template>
            </template>
            <!-- / history ends here -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
