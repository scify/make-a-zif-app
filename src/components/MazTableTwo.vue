<script>
import UnitAngstrom from "./units/UnitAngstrom.vue";
import UnitGMol from "./units/UnitGMol.vue";

export default {
  components: {
    UnitAngstrom,
    UnitGMol,
  },
  props: {
    ["selectedScenario"]: { required: true },
    ["listOfGases"]: { required: true },
  },
  emits: ["update:selectedGas"],
  created() {},
  data() {
    return {
      //* Cosmetic thingies */
      hoverColumns: {
        gas: false,
      },
      inputGas: false,
    };
  },
  mounted() {
    console.log("T2 acquired Gas: " + this.selectedScenario.gas);
    this.inputGas = this.selectedScenario.gas;
  },
  methods: {
    /* Cosmetic methods */
    onMouseHover(columnGroup) {
      this.hoverColumns[columnGroup] = true;
    },
    onMouseLeave(columnGroup) {
      this.hoverColumns[columnGroup] = false;
    },
    /* Functional emitting */
    emitGas() {
      console.log("T2 emitted Gas update: " + this.inputGas);
      this.$emit("update:selectedGas", this.inputGas);
    },
  },
  watch: {
    inputGas() {
      document.querySelector("#mazExecuteButton").classList.remove("disabled");
      document.querySelector("#gasModalContent").classList.remove("warning");
    },
  },
};
</script>

<template>
  <!-- v-if starts here -->
  <div class="maz-table" v-if="selectedScenario && listOfGases">
    <h4 class="two">Add a gas element</h4>
    <h5>Click on the Gas column to select a fume.</h5>
    <h6>
      Keep in mind that the larger the gas is, the larger the modification
      impact will be on its diffusivity.
    </h6>
    <table class="table-multi limitwidth">
      <colgroup class="header"></colgroup>
      <colgroup class="gas"></colgroup>
      <thead>
        <tr class="modal-row">
          <th
            scope="col"
            class="hidden limitwidth"
            aria-label="Properties"
            role="columnheader"
          >
            <div class="col-modal">#</div>
          </th>
          <th scope="col" class="gas divider">
            <button
              id="gasModalButton"
              class="col-modal"
              data-bs-toggle="modal"
              data-bs-target="#gasModal"
              v-on:mouseover="onMouseHover('gas')"
              v-on:mouseleave="onMouseLeave('gas')"
              aria-label="Selection of Gas"
              role="button"
            >
              <span class="col-title--arrow">Gas</span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="text-start">Name</th>
          <td
            v-if="selectedScenario.gas"
            class="gas element"
            :class="hoverColumns.gas ? 'hover' : ''"
            v-html="selectedScenario.gas.name"
          ></td>
          <td v-else class="gas" :class="hoverColumns.gas ? 'hover' : 'faded'">
            &#8212;
          </td>
        </tr>
        <tr>
          <th scope="row" class="text-start">Mass <UnitGMol :abbr="true" /></th>
          <td
            v-if="selectedScenario.gas"
            class="gas"
            :class="hoverColumns.gas ? 'hover' : ''"
          >
            {{ selectedScenario.gas.mass.value }}
          </td>
          <td v-else class="gas" :class="hoverColumns.gas ? 'hover' : 'faded'">
            &#8212;
          </td>
        </tr>
        <tr>
          <th scope="row" class="text-start">
            Kinetic diameter <UnitAngstrom :abbr="true" />
          </th>
          <td
            v-if="selectedScenario.gas"
            class="gas"
            :class="hoverColumns.gas ? 'hover' : ''"
          >
            {{ selectedScenario.gas.kineticDiameter.value }}
          </td>
          <td v-else class="gas" :class="hoverColumns.gas ? 'hover' : 'faded'">
            &#8212;
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Gas modal starts here -->
    <div
      class="modal fade"
      id="gasModal"
      tabindex="-1"
      aria-labelledby="gasModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" id="gasModalContent">
          <div class="modal-header align-items-baseline">
            <div class="modal-title">
              <h6 id="gasModalLabel" class="fs-4 modal-label">Select a Gas</h6>
              <p id="gasModalDescription">
                Select a gas from the following list
              </p>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="emitGas()">
              <table class="table--select">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Gas</th>
                    <th scope="col">Kinetic diameter</th>
                    <th scope="col">Mass</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&#8212;</td>
                    <th scope="row" class="text-start">
                      <input
                        v-if="inputGas === false"
                        type="radio"
                        name="gas"
                        value=""
                        id="gasfalse"
                        checked="checked"
                        v-model="inputGas"
                      />
                      <input
                        v-else
                        type="radio"
                        name="gas"
                        value=""
                        id="gasfalse"
                        v-model="inputGas"
                      />
                      <label class="element" for="gasfalse">None</label>
                    </th>
                    <td class="text-center">&#8212;</td>
                    <td class="text-center">&#8212;</td>
                  </tr>
                  <tr
                    v-for="(gas, index) in listOfGases"
                    :key="index"
                    v-bind:title="gas.title"
                  >
                    <td>{{ index + 1 }}</td>
                    <th scope="row" class="text-start">
                      <input
                        type="radio"
                        name="gas"
                        v-bind:value="gas"
                        v-bind:id="gas.key"
                        v-model="inputGas"
                      />
                      <label
                        class="element"
                        v-bind:for="gas.key"
                        v-html="gas.name"
                      >
                      </label>
                    </th>
                    <td class="text-center">
                      {{ gas.kineticDiameter.value
                      }}<span class="unit inline">{{
                        gas.kineticDiameter.unit.symbol
                      }}</span>
                    </td>
                    <td class="text-center">
                      {{ gas.mass.value
                      }}<span class="unit inline shrinked">{{
                        gas.mass.unit.symbol
                      }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                type="submit"
                class="btn primary rounded me-auto"
                data-bs-dismiss="modal"
              >
                Add Gas
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Gas modal ends here-->
  </div>
  <!-- v-if ends here -->
</template>
