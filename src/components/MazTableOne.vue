<script>
import UnitAngstrom from "./units/UnitAngstrom.vue";
import UnitDalton from "./units/UnitDalton.vue";

export default {
  components: {
    UnitAngstrom,
    UnitDalton,
  },
  props: {
    ["selectedScenario"]: { required: true },
    ["listOfMetals"]: { required: true },
    ["listOfLinkers"]: { required: true },
    ["listOfGroups"]: { required: true },
  },
  emits: [
    "update:selectedMetal",
    "update:selectedLinkers",
    "update:selectedGroups",
  ],
  data() {
    return {
      // Functional
      inputMetal: null,
      inputLinker1: null,
      inputLinker2: null,
      inputLinker3: null,
      inputFuncGroup1: null,
      inputFuncGroup2: null,
      inputFuncGroup3: null,
      // Cosmetics
      hoverColumns: {
        metal: false,
        linker: false,
        group: false,
      },
    };
  },
  mounted() {
    console.log("T1 acquired Metal, Linkers & Groups");
    this.inputMetal = this.selectedScenario.metal;
    this.inputLinker1 = this.selectedScenario.linker1;
    this.inputLinker2 = this.selectedScenario.linker2;
    this.inputLinker3 = this.selectedScenario.linker3;
    this.inputFuncGroup1 = this.selectedScenario.funcGroup1;
    this.inputFuncGroup2 = this.selectedScenario.funcGroup2;
    this.inputFuncGroup3 = this.selectedScenario.funcGroup3;
  },
  methods: {
    /* Cosmetic methods */
    onMouseHover(columnGroup) {
      this.hoverColumns[columnGroup] = true;
    },
    onMouseLeave(columnGroup) {
      this.hoverColumns[columnGroup] = false;
    },
    clickMetalRow(metal) {
      this.inputMetal = metal;
    },
    /* Functional emitting */
    emitMetal() {
      this.$emit("update:selectedMetal", this.inputMetal);
      console.log("T1 emitted metal " + this.inputMetal);
    },
    emitLinkers() {
      const inputLinkers = {
        linker1: this.inputLinker1,
        linker2: this.inputLinker2,
        linker3: this.inputLinker3,
      };
      this.$emit("update:selectedLinkers", inputLinkers);
      console.log("T1 emitted linkers " + inputLinkers);
    },
    emitGroups() {
      const inputGroups = {
        group1: this.inputFuncGroup1,
        group2: this.inputFuncGroup2,
        group3: this.inputFuncGroup3,
      };
      this.$emit("update:selectedGroups", inputGroups);
      console.log("T1 emitted groups " + inputGroups);
    },
  },
};
</script>

<template>
  <!-- v-if starts here -->
  <div
    class="maz-table my-4"
    v-if="
      selectedScenario &&
      listOfMetals &&
      listOfLinkers &&
      listOfGroups &&
      inputLinker1 &&
      inputLinker2 &&
      inputLinker3 &&
      inputFuncGroup1 &&
      inputFuncGroup2 &&
      inputFuncGroup3
    "
  >
    <h4 class="one">Select metal, linkers & groups</h4>
    <h5>
      Click on the columns to replace the metal, organic linkers &amp;
      functional groups in the ZIF.
    </h5>
    <table class="table-multi table-responsive-hide">
      <colgroup class="header"></colgroup>
      <colgroup class="metal"></colgroup>
      <colgroup class="linker" span="3"></colgroup>
      <colgroup class="group" span="3"></colgroup>
      <thead>
        <tr class="modal-row">
          <th
            scope="col"
            class="hidden"
            aria-label="Properties"
            role="columnheader"
          >
            <div class="col-modal">#</div>
          </th>
          <th scope="col" class="metal divider">
            <button
              id="metalModalBtn"
              class="col-modal"
              data-bs-toggle="modal"
              data-bs-target="#metalModal"
              v-on:mouseover="onMouseHover('metal')"
              v-on:mouseleave="onMouseLeave('metal')"
              aria-label="Selection of Metal"
              role="button"
            >
              <span class="col-title--arrow">Metal</span>
            </button>
          </th>
          <th scope="col" colspan="3" class="linker divider">
            <button
              id="linkersModalBtn"
              class="col-modal"
              data-bs-toggle="modal"
              data-bs-target="#linkersModal"
              v-on:mouseover="onMouseHover('linker')"
              v-on:mouseleave="onMouseLeave('linker')"
              aria-label="Selection of Organic Linkers"
              role="button"
            >
              <span class="col-title--arrow">Organic Linkers</span>
            </button>
          </th>
          <th scope="col" colspan="3" class="group divider">
            <button
              id="groupsModalBtn"
              class="col-modal"
              data-bs-toggle="modal"
              data-bs-target="#groupsModal"
              v-on:mouseover="onMouseHover('group')"
              v-on:mouseleave="onMouseLeave('group')"
              aria-label="Selection of Functional Groups"
              role="button"
            >
              <span class="col-title--arrow">Functional Groups</span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="text-start">Name</th>
          <td
            class="metal element"
            :class="hoverColumns.metal ? 'hover' : ''"
            v-html="selectedScenario.metal.name"
          ></td>
          <td
            class="linker linker element"
            :class="hoverColumns.linker ? 'hover' : ''"
            v-html="selectedScenario.linker1.name"
          ></td>
          <td
            class="linker linker2 element"
            :class="hoverColumns.linker ? 'hover' : ''"
            v-html="selectedScenario.linker2.name"
          ></td>
          <td
            class="linker linker3 element"
            :class="hoverColumns.linker ? 'hover' : ''"
            v-html="selectedScenario.linker3.name"
          ></td>
          <td
            class="group group1 element"
            :class="hoverColumns.group ? 'hover' : ''"
            v-html="selectedScenario.funcGroup1.name"
          ></td>
          <td
            class="group group2 element"
            :class="hoverColumns.group ? 'hover' : ''"
            v-html="selectedScenario.funcGroup2.name"
          ></td>
          <td
            class="group group3 element"
            :class="hoverColumns.group ? 'hover' : ''"
            v-html="selectedScenario.funcGroup3.name"
          ></td>
        </tr>
        <tr>
          <th scope="row" class="text-start">
            Mass <UnitDalton :abbr="true" />
          </th>
          <td class="metal" :class="hoverColumns.metal ? 'hover' : ''">
            {{ selectedScenario.metal.mass.value }}
          </td>
          <td
            class="linker linker1"
            :class="hoverColumns.linker ? 'hover' : ''"
          >
            {{ selectedScenario.linker1.mass.value }}
          </td>
          <td
            class="linker linker2"
            :class="hoverColumns.linker ? 'hover' : ''"
          >
            {{ selectedScenario.linker2.mass.value }}
          </td>
          <td
            class="linker linker3"
            :class="hoverColumns.linker ? 'hover' : ''"
          >
            {{ selectedScenario.linker3.mass.value }}
          </td>
          <td class="group group1" :class="hoverColumns.group ? 'hover' : ''">
            {{ selectedScenario.funcGroup1.mass.value }}
          </td>
          <td class="group group2" :class="hoverColumns.group ? 'hover' : ''">
            {{ selectedScenario.funcGroup2.mass.value }}
          </td>
          <td class="group group3" :class="hoverColumns.group ? 'hover' : ''">
            {{ selectedScenario.funcGroup3.mass.value }}
          </td>
        </tr>
        <tr>
          <th scope="row" class="text-start">
            Length <UnitAngstrom :abbr="true" />
          </th>
          <td class="metal" :class="hoverColumns.metal ? 'hover' : ''">
            <!-- {{ selectedScenario.metal.size.value }} -->
            &#8212;
          </td>
          <td
            class="linker linker1"
            :class="hoverColumns.linker ? 'hover' : ''"
          >
            {{ selectedScenario.linker1.size.value }}
          </td>
          <td
            class="linker linker2"
            :class="hoverColumns.linker ? 'hover' : ''"
          >
            {{ selectedScenario.linker2.size.value }}
          </td>
          <td
            class="linker linker3"
            :class="hoverColumns.linker ? 'hover' : ''"
          >
            {{ selectedScenario.linker3.size.value }}
          </td>
          <td class="group group1" :class="hoverColumns.group ? 'hover' : ''">
            {{ selectedScenario.funcGroup1.size.value }}
          </td>
          <td class="group group2" :class="hoverColumns.group ? 'hover' : ''">
            {{ selectedScenario.funcGroup2.size.value }}
          </td>
          <td class="group group3" :class="hoverColumns.group ? 'hover' : ''">
            {{ selectedScenario.funcGroup3.size.value }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Metal modal starts here -->
    <div
      class="modal fade"
      id="metalModal"
      tabindex="-1"
      aria-labelledby="metalModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header align-items-baseline">
            <div class="modal-title">
              <h6 id="metalModalLabel" class="fs-4">Select a Metal</h6>
              <p>Select a metal from the the list below</p>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="emitMetal()">
              <table class="table--select">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Metal</th>
                    <th scope="col" class="fw-bold text-capitalize">
                      {{ listOfMetals[0].size.name }}
                    </th>
                    <th scope="col" class="fw-bold text-capitalize">
                      {{ listOfMetals[0].mass.name }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(metal, index) in listOfMetals"
                    :key="index"
                    v-bind:title="metal.title"
                    @click="clickMetalRow(metal)"
                  >
                    <td>{{ index + 1 }}</td>
                    <th scope="row" class="text-start">
                      <input
                        type="radio"
                        name="metal"
                        v-bind:value="metal"
                        v-bind:id="metal.key"
                        v-model="inputMetal"
                      />
                      <label
                        class="element"
                        v-bind:for="metal.key"
                        v-html="metal.name"
                      >
                      </label>
                    </th>
                    <td class="text-center">
                      {{ metal.size.value
                      }}<span class="unit inline">{{
                        metal.size.unit.symbol
                      }}</span>
                    </td>
                    <td class="text-center">
                      {{ metal.mass.value
                      }}<span class="unit inline">{{
                        metal.mass.unit.symbol
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
                Select Metal
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Metal modal ends here-->
    <!-- Linkers modal starts here -->
    <div
      class="modal fade"
      id="linkersModal"
      tabindex="-1"
      aria-labelledby="linkersModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header align-items-baseline">
            <div class="modal-title">
              <h6 id="linkersModalLabel" class="fs-4">
                Select the Organic Linkers
              </h6>
              <p>Select the 3 organic linkers of the ZIF</p>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="emitLinkers()">
              <div class="container px-0 table-like">
                <div class="row gx-1 header-like">
                  <div class="col text-center">Linker 1</div>
                  <div class="col text-center">Linker 2</div>
                  <div class="col text-center">Linker 3</div>
                </div>
                <div class="row raw-data px-0 gx-0">
                  <div class="col col1 text-center">
                    <span
                      v-bind:title="inputLinker1.mass.name"
                      v-bind:aria-label="inputLinker1.mass.name"
                    >
                      {{ inputLinker1.mass.value }} <UnitDalton />
                    </span>
                    <br />
                    <span
                      class="small"
                      v-bind:title="inputLinker1.size.name"
                      v-bind:aria-label="inputLinker1.size.name"
                    >
                      {{ inputLinker1.size.value }} <UnitAngstrom />
                    </span>
                  </div>
                  <div class="col col2 text-center">
                    <span
                      v-bind:title="inputLinker1.mass.name"
                      v-bind:aria-label="inputLinker2.mass.name"
                    >
                      {{ inputLinker2.mass.value }} <UnitDalton />
                    </span>
                    <br />
                    <span
                      class="small"
                      v-bind:title="inputLinker2.size.name"
                      v-bind:aria-label="inputLinker2.size.name"
                    >
                      {{ inputLinker2.size.value }} <UnitAngstrom />
                    </span>
                  </div>
                  <div class="col col3 text-center">
                    <span
                      v-bind:title="inputLinker1.mass.name"
                      v-bind:aria-label="inputLinker3.mass.name"
                    >
                      {{ inputLinker3.mass.value }} <UnitDalton />
                    </span>
                    <br />
                    <span
                      class="small"
                      v-bind:title="inputLinker3.size.name"
                      v-bind:aria-label="inputLinker3.size.name"
                    >
                      {{ inputLinker3.size.value }} <UnitAngstrom />
                    </span>
                  </div>
                </div>
                <div class="row px-0 gx-1">
                  <div class="col col1">
                    <ul>
                      <li
                        v-for="(l1, index1) in listOfLinkers"
                        :key="index1"
                        v-bind:title="l1.title"
                      >
                        <input
                          type="radio"
                          name="linker1"
                          v-bind:value="l1"
                          v-bind:id="l1.key + 'linker1'"
                          v-model="inputLinker1"
                        />
                        <label
                          class="element"
                          v-bind:for="l1.key + 'linker1'"
                          v-html="l1.name"
                        >
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div class="col col2">
                    <ul>
                      <li
                        v-for="(l2, index2) in listOfLinkers"
                        :key="index2"
                        v-bind:title="l2.title"
                      >
                        <input
                          type="radio"
                          name="linker2"
                          v-bind:value="l2"
                          v-bind:id="l2.key + 'linker2'"
                          v-model="inputLinker2"
                        />
                        <label
                          class="element"
                          v-bind:for="l2.key + 'linker2'"
                          v-html="l2.name"
                        >
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div class="col col3">
                    <ul>
                      <li
                        v-for="(l3, index3) in listOfLinkers"
                        :key="index3"
                        v-bind:title="l3.title"
                      >
                        <input
                          type="radio"
                          name="linker3"
                          v-bind:value="l3"
                          v-bind:id="l3.key + 'linker3'"
                          v-model="inputLinker3"
                        />
                        <label
                          class="element"
                          v-bind:for="l3.key + 'linker3'"
                          v-html="l3.name"
                        >
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="btn primary rounded me-auto"
                data-bs-dismiss="modal"
              >
                Select organic linkers
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Linker modal ends here-->
    <!-- Functional groups modal starts here -->
    <div
      class="modal fade"
      id="groupsModal"
      tabindex="-1"
      aria-labelledby="groupsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header align-items-baseline">
            <div class="modal-title">
              <h6 id="groupsModalLabel" class="fs-4">
                Select the Functional Groups
              </h6>
              <p>Select the 3 functional groups of the ZIF</p>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="emitGroups()">
              <div class="container px-0 table-like">
                <div class="row gx-1 header-like">
                  <div class="col text-center">Group 1</div>
                  <div class="col text-center">Group 2</div>
                  <div class="col text-center">Group 3</div>
                </div>
                <div class="row raw-data px-0 gx-0">
                  <div class="col col1 text-center">
                    <span v-bind:title="inputFuncGroup1.mass.name">
                      {{ inputFuncGroup1.mass.value }} <UnitDalton />
                    </span>
                    <br />
                    <span
                      class="small"
                      v-bind:title="inputFuncGroup1.size.name"
                      v-bind:aria-label="inputFuncGroup1.size.name"
                    >
                      {{ inputFuncGroup1.size.value }} <UnitAngstrom />
                    </span>
                  </div>
                  <div class="col col2 text-center">
                    <span v-bind:title="inputFuncGroup2.mass.name">
                      {{ inputFuncGroup2.mass.value }} <UnitDalton />
                    </span>
                    <br />
                    <span
                      class="small"
                      v-bind:title="inputFuncGroup2.size.name"
                      v-bind:aria-label="inputFuncGroup2.size.name"
                    >
                      {{ inputFuncGroup2.size.value }} <UnitAngstrom />
                    </span>
                  </div>
                  <div class="col col3 text-center">
                    <span v-bind:title="inputFuncGroup3.mass.name">
                      {{ inputFuncGroup3.mass.value }} <UnitDalton />
                    </span>
                    <br />
                    <span
                      class="small"
                      v-bind:title="inputFuncGroup3.size.name"
                      v-bind:aria-label="inputFuncGroup3.size.name"
                    >
                      {{ inputFuncGroup3.size.value }} <UnitAngstrom />
                    </span>
                  </div>
                </div>
                <div class="row px-0 gx-1">
                  <div class="col col1">
                    <ul>
                      <li
                        v-for="(g1, gIndex1) in listOfGroups"
                        :key="gIndex1"
                        v-bind:title="g1.title"
                      >
                        <input
                          type="radio"
                          name="group1"
                          v-bind:value="g1"
                          v-bind:id="g1.key + 'group1'"
                          v-model="inputFuncGroup1"
                        />
                        <label
                          class="element"
                          v-bind:for="g1.key + 'group1'"
                          v-html="g1.name"
                        >
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div class="col col2">
                    <ul>
                      <li
                        v-for="(g2, gIndex2) in listOfGroups"
                        :key="gIndex2"
                        v-bind:title="g2.title"
                      >
                        <input
                          type="radio"
                          name="group2"
                          v-bind:value="g2"
                          v-bind:id="g2.key + 'group2'"
                          v-model="inputFuncGroup2"
                        />
                        <label
                          class="element"
                          v-bind:for="g2.key + 'group2'"
                          v-html="g2.name"
                        >
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div class="col col3">
                    <ul>
                      <li
                        v-for="(g3, gIndex3) in listOfGroups"
                        :key="gIndex3"
                        v-bind:title="g3.title"
                      >
                        <input
                          type="radio"
                          name="group3"
                          v-bind:value="g3"
                          v-bind:id="g3.key + 'group3'"
                          v-model="inputFuncGroup3"
                        />
                        <label
                          class="element"
                          v-bind:for="g3.key + 'group3'"
                          v-html="g3.name"
                        >
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="btn primary rounded me-auto"
                data-bs-dismiss="modal"
              >
                Select functional groups
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Functional groups modal ends here-->
  </div>
  <!-- v-if ends here -->
</template>
