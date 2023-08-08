<script>
/**
 * Experimental use of p5.js for rendering output on a canvas.
 */
import UnitNanometre from "../units/UnitNanometre.vue";
export default {
  components: {
    UnitNanometre,
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
  <div class="maz-tabs col mt-3 mb-1 mt-md-0 mb-md-0" id="mazResults">
    <!-- Tabs starts here -->
    <div class="section-tabs mb-3">
      <ul id="mazTabs" class="nav nav-tabs ms-0" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active pt-3 ps-5 pe-5"
            id="mazMemoTab"
            data-bs-toggle="tab"
            data-bs-target="#mazMemo"
            type="button"
            role="tab"
            aria-controls="mazMemo"
            aria-selected="true"
          >
            Memo
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link pt-3 ps-5 pe-5"
            id="mazHistoryTab"
            data-bs-toggle="tab"
            data-bs-target="#mazHistory"
            type="button"
            role="tab"
            aria-controls="mazHistory"
            aria-selected="false"
          >
            History
          </button>
        </li>
      </ul>
    </div>
    <!-- Tabs ends here -->
    <!-- Content hidden under tabs starts here -->
    <div class="tab-content" id="mazTabContent">
      <!-- Memo tab starts here -->
      <div
        class="tab-pane fade show active"
        id="mazMemo"
        role="tabpanel"
        aria-labelledby="mazMemoTab"
      >
        <!-- mockup Make-a-ΖΙF default data -->
        <div class="maz-results-table" id="mazResultsTable">
          <table class="table">
            <thead>
              <tr>
                <th v-if="scenarioResults.name" scope="col" class="text-start">
                  {{ scenarioResults.name }}
                </th>
                <th v-else scope="col" class="text-start">
                  {{ scenarioResults.formattedDate }}
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" class="text-start">Diameter</th>
                <td>
                  {{ scenarioResults.diameter }}
                  <UnitNanometre :abbr="true" />
                </td>
              </tr>
              <tr>
                <th scope="row" class="text-start">Permeability</th>
                <td>{{ scenarioResults.permeability }}</td>
              </tr>
            </tbody>
          </table>
          <div
            id="mazDiffusion"
            v-if="scenarioResults.showDiff"
            class="maz-diffusion text-center p-3 mb-0"
          >
            Diffusion: <strong>{{ scenarioResults.diffusion }}</strong>
          </div>
        </div>
        <div v-if="scenarioResults.showSave" class="maz-save">
          <p class="text-sm mb-2">
            Save the scenario & its results on your history
          </p>
          <form @submit.prevent="saveScenario()">
            <input
              type="text"
              class="form-control mb-2"
              maxlength="20"
              v-model="inputScenarioName"
              placeholder="Scenario name"
              aria-label="Scenario name"
            />
            <input
              type="hidden"
              name="scenario"
              v-bind:value="scenarioResults"
            />
            <button class="btn primary" type="submit">Save scenario</button>
          </form>
        </div>
      </div>
      <!-- Memo tab ends here -->
      <!-- History tab starts here -->
      <div
        class="tab-pane fade maz-history"
        id="mazHistory"
        role="tabpanel"
        aria-labelledby="mazHistoryTab"
      >
        <div class="text-center message" v-if="!scenarioHistory">
          No saved execution.
        </div>
        <!-- Scenarios starts here -->
        <div v-if="scenarioHistory" class="maz-history-scroll">
          <!-- Scenario loop starts here -->
          <template
            v-for="(item, key) in scenarioHistory.slice().reverse()"
            :key="key"
          >
            <div class="maz-scenario" :id="'saved-scenario-' + key">
              <div
                class="d-flex align-items-center justify-content-between data"
              >
                <div class="pt-2 pb-2">
                  <div class="date">{{ item.formattedDate }}</div>
                  <div class="text">
                    Executed <strong>{{ item.name }}</strong> with
                    <strong>Diffusion: {{ item.diffusion }}</strong>
                  </div>
                </div>
                <div class="icon">
                  <button
                    class="dot"
                    type="button"
                    title="Remove scenario"
                    aria-label="Remove scenario"
                    aria-hidden="false"
                    @click="$emit('do:deleteScenario', item.date)"
                  >
                    <span class="dash"></span>
                  </button>
                </div>
              </div>
              <div class="d-flex gap-3">
                <button
                  class="btn primary"
                  type="button"
                  @click="$emit('do:downloadScenario', item.date)"
                >
                  Download data
                </button>
                <button
                  class="btn secondary"
                  type="button"
                  @click="$emit('do:loadScenario', item.date)"
                >
                  Restore scenario
                </button>
              </div>
            </div>
          </template>
          <!-- Scenario loop ends here -->
        </div>
        <!-- Scenarios ends here -->
      </div>
      <!-- History tab ends here -->
    </div>
    <!-- Content hidden under tabs ends here -->
  </div>
</template>
