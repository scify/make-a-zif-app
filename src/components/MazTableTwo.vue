<script>
import UnitDalton from "./units/UnitDalton.vue";

export default {
  components: {
    UnitDalton,
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
};
</script>

<template>
  <!-- v-if starts here -->
  <div class="maz-table" v-if="selectedScenario && listOfGases">
    <h4 class="two">Add a gas element</h4>
    <h5>You can optionally add a gas element to the ZIF.</h5>
    <table class="table-multi limitwidth">
      <colgroup class="header"></colgroup>
      <colgroup class="gas"></colgroup>
      <thead>
        <tr>
          <th
            scope="col"
            class="hidden limitwidth"
            aria-label="Properties"
            role="columnheader"
          >
            #
          </th>
          <th scope="col" class="gas divider">
            <div
              class="col-modal"
              data-bs-toggle="modal"
              data-bs-target="#gasModal"
              v-on:mouseover="onMouseHover('gas')"
              v-on:mouseleave="onMouseLeave('gas')"
              aria-label="Selection of Gas"
              role="button"
            >
              <div class="col-title--arrow">Gas</div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Name</th>
          <td
            v-if="selectedScenario.gas"
            class="gas element"
            :class="hoverColumns.gas ? 'hover' : ''"
            v-html="selectedScenario.gas.name"
          ></td>
          <td v-else class="gas" :class="hoverColumns.gas ? 'hover' : 'faded'">
            -
          </td>
        </tr>
        <tr>
          <th scope="row">Mass <UnitDalton :abbr="true" /></th>
          <td
            v-if="selectedScenario.gas"
            class="gas"
            :class="hoverColumns.gas ? 'hover' : ''"
          >
            {{ selectedScenario.gas.mass }}
          </td>
          <td v-else class="gas" :class="hoverColumns.gas ? 'hover' : 'faded'">
            -
          </td>
        </tr>
        <tr>
          <th scope="row">Kinetic diameter</th>
          <td
            v-if="selectedScenario.gas"
            class="gas"
            :class="hoverColumns.gas ? 'hover' : ''"
          >
            {{ selectedScenario.gas.diameter }}
          </td>
          <td v-else class="gas" :class="hoverColumns.gas ? 'hover' : 'faded'">
            -
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
        <div class="modal-content">
          <div class="modal-header align-items-baseline">
            <div class="modal-title">
              <h6 id="gasModalLabel" class="fs-4">Select a Gas</h6>
              <p>Select a gas from the following list</p>
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
                    <th scope="col">Mass <UnitDalton :abbr="true" /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>-</td>
                    <th scope="row">
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
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr
                    v-for="(gas, index) in listOfGases"
                    :key="index"
                    v-bind:title="gas.title"
                  >
                    <td>{{ index + 1 }}</td>
                    <th scope="row">
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
                    <td>{{ gas.diameter }}</td>
                    <td>{{ gas.mass }}</td>
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
