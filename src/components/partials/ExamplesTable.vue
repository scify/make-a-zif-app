<template>
  <div class="example">
    <div v-if="title" class="example--title">
      <h5>{{ title }}</h5>
    </div>
    <div v-if="notes" class="example--notes">
      {{ notes }}
    </div>
    <table class="table-multi table-responsive-hide">
      <caption v-if="caption" v-html="caption"></caption>
      <thead>
        <tr>
          <th scope="col">&nbsp;</th>
          <th scope="col">Metal</th>
          <th scope="col" colspan="3">Organic linkers</th>
          <th scope="col" colspan="3">Functional groups</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Name</th>
          <td :class="{ highlight: columnHighlight === 'metal' }">
            <span
              class="help"
              v-html="getMetal(this.metal).name"
              v-tooltip.auto="getMetal(this.metal).title"
            ></span>
          </td>
          <td v-html="getLinker(this.linker1).name"></td>
          <td v-html="getLinker(this.linker2).name"></td>
          <td
            :class="{ highlight: columnHighlight === 'linker3' }"
            v-html="getLinker(this.linker3).name"
          ></td>
          <td>
            <span
              class="help"
              v-html="getGroup(this.group1).name"
              v-tooltip.auto="getGroup(this.group1).title"
            ></span>
          </td>
          <td>
            <span
              class="help"
              v-html="getGroup(this.group2).name"
              v-tooltip.auto="getGroup(this.group2).title"
            ></span>
          </td>
          <td>
            <span
              class="help"
              v-html="getGroup(this.group3).name"
              v-tooltip.auto="getGroup(this.group3).title"
            ></span>
          </td>
        </tr>
        <tr>
          <th scope="row">Mass <UnitDalton :abbr="true" /></th>
          <td :class="{ highlight: columnHighlight === 'metal' }">
            {{ getMetal(this.metal).mass.value }}
          </td>
          <td>{{ getLinker(this.linker1).mass.value }}</td>
          <td>{{ getLinker(this.linker2).mass.value }}</td>
          <td :class="{ highlight: columnHighlight === 'linker3' }">
            {{ getLinker(this.linker3).mass.value }}
          </td>
          <td>{{ getGroup(this.group1).mass.value }}</td>
          <td>{{ getGroup(this.group2).mass.value }}</td>
          <td>{{ getGroup(this.group3).mass.value }}</td>
        </tr>
        <tr>
          <th scope="row">Length <UnitAngstrom :abbr="true" /></th>
          <td :class="{ highlight: columnHighlight === 'metal' }">—</td>
          <td>{{ getLinker(this.linker1).size.value }}</td>
          <td>{{ getLinker(this.linker2).size.value }}</td>
          <td :class="{ highlight: columnHighlight === 'linker3' }">
            {{ getLinker(this.linker3).size.value }}
          </td>
          <td>{{ getGroup(this.group1).size.value }}</td>
          <td>{{ getGroup(this.group2).size.value }}</td>
          <td>{{ getGroup(this.group3).size.value }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="gases" class="example--gases">
      <h6>Impact on diffusivities</h6>
      <table class="table-multi">
        <thead>
          <tr>
            <th scope="col">Gas</th>
            <th scope="col">
              Diffusivity
              <!-- @TODO -->
              <span
                class="alert-warning alert"
                v-tooltip="
                  `Please confirm that (1) this unit (of measurement) is correct & (2) that it also applies to the Executed ZIF diffusivities (aka the number that the API provides as 'diffusivity'). If that's the case, then it should be added there as well (3)! Is diffusivity = diffusion = '𝑫' (4)?  Should the temperature be specified (5)? Finally, Aperture has been removed as the API does not provide it (6) - furthermore, it was not provided for all examples. Also note that on the original examples, the word unit was used to describe both units of measurement AND the structural units (of the ZIF) - it was confusing and it has been corrected.`
                "
                >(10<sup>-10</sup> m<sup>2</sup>/s)</span
              >
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(gas, index) in gases" :key="index">
            <th scope="row" class="highlight-gas">
              <span
                class="help"
                v-html="getGas(gas.key).name"
                v-tooltip="getGas(gas.key).title"
              ></span>
            </th>
            <!-- @TODO Proper diffusivities for gases -->
            <td class="highlight-diffusion">
              <span
                class="alert alert-warning"
                v-tooltip="
                  'Please note that on the mock-ups the diffusivities for all examples are the same. The proper, expected values are needed.'
                "
                >{{ gas.diffusion }}</span
              >
            </td>
            <td class="highlight-diffusion execute">
              <button
                type="button"
                class="btn btn-sm btn-primary"
                title="Apply scenario to the Make-a-ZIF app"
                aria-label="Apply scenario to the Make-a-ZIF app"
                @click="
                  $emit(
                    'do:loadExampleScenario',
                    this.createExampleScenario(gas.key)
                  )
                "
              >
                Try it!
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="reference"
      class="example--reference text-end small"
      v-html="reference"
    ></div>
  </div>
</template>
<style lang="scss">
// @TODO Remove when alerts are irrelevant.
.alert {
  padding: 0.35rem !important;
}
</style>

<script>
import UnitAngstrom from "./../units/UnitAngstrom.vue";
import UnitDalton from "./../units/UnitDalton.vue";

export default {
  components: {
    UnitAngstrom,
    UnitDalton,
  },
  props: {
    ["metal"]: { required: false, default: "zn" },
    ["linker1"]: { required: false, default: "mlm" },
    ["linker2"]: { required: false, default: "mlm" },
    ["linker3"]: { required: false, default: "mlm" },
    ["group1"]: { required: false, default: "ch3" },
    ["group2"]: { required: false, default: "ch3" },
    ["group3"]: { required: false, default: "ch3" },
    // The title of the table.
    ["title"]: { required: false, default: false },
    // The caption of the table.
    ["caption"]: { required: false, default: false },
    //
    ["notes"]: { required: false, default: false },
    //
    ["reference"]: { required: false, default: false },
    // An array of gas objects (with a gas.key and a gas.diffusion).
    ["gases"]: { required: false, default: false },
    // No idea yet.
    ["aperture"]: { required: false, default: 3.46 },
    // Should a column be highlighted?
    ["columnHighlight"]: { required: false, default: false },
  },
  emits: ["do:loadExampleScenario"],
  methods: {
    getGas(key) {
      const gas = key
        ? this.$root["listOfGases"].find((i) => i.key === key)
        : null;
      return gas ? gas : false;
    },
    getGroup(key) {
      const group = key
        ? this.$root["listOfGroups"].find((i) => i.key === key)
        : null;
      return group ? group : false;
    },
    getMetal(key) {
      const metal = key
        ? this.$root["listOfMetals"].find((i) => i.key === key)
        : null;
      return metal ? metal : false;
    },
    getLinker(key) {
      const linker = key
        ? this.$root["listOfLinkers"].find((i) => i.key === key)
        : null;
      return linker ? linker : false;
    },
    createExampleScenario(gasKey) {
      return {
        metal: this.metal,
        linker1: this.linker1,
        linker2: this.linker2,
        linker3: this.linker3,
        funcGroup1: this.group1,
        funcGroup2: this.group2,
        funcGroup3: this.group3,
        gas: gasKey,
      };
    },
  },
};
</script>
