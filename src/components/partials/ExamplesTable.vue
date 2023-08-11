<template>
  <div class="table-example">
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
          <td>
            <span
              class="help"
              v-html="getMetal(this.metal).name"
              v-tooltip.auto="getMetal(this.metal).title"
            ></span>
          </td>
          <td v-html="getLinker(this.linker1).name"></td>
          <td v-html="getLinker(this.linker2).name"></td>
          <td v-html="getLinker(this.linker3).name"></td>
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
          <td>{{ getMetal(this.metal).mass.value }}</td>
          <td>{{ getLinker(this.linker1).mass.value }}</td>
          <td>{{ getLinker(this.linker2).mass.value }}</td>
          <td>{{ getLinker(this.linker3).mass.value }}</td>
          <td>{{ getGroup(this.group1).mass.value }}</td>
          <td>{{ getGroup(this.group2).mass.value }}</td>
          <td>{{ getGroup(this.group3).mass.value }}</td>
        </tr>
        <tr>
          <th scope="row">Length <UnitAngstrom :abbr="true" /></th>
          <td>—</td>
          <td>{{ getLinker(this.linker1).size.value }}</td>
          <td>{{ getLinker(this.linker2).size.value }}</td>
          <td>{{ getLinker(this.linker3).size.value }}</td>
          <td>{{ getGroup(this.group1).size.value }}</td>
          <td>{{ getGroup(this.group2).size.value }}</td>
          <td>{{ getGroup(this.group3).size.value }}</td>
        </tr>
      </tbody>
    </table>
    Gas diffusivities (10<sup>-10</sup> m<sup>2</sup>/s)
    <!-- @TODO -->
    <span
      class="alert-warning alert"
      v-tooltip="
        `Please confirm that (1) this unit (of measurement) is correct & (2) that it also applies to the Executed ZIF diffusivities (aka the number that the API provides as 'diffusivity'). If that's the case, then it should be added there as well (3)! Is diffusivity = diffusion = '𝑫' (4)?  Should the temperature be specified (5)? --- Also note that on the original examples, the word unit was used to describe both units of measurement AND the structural units (of the ZIF) - it was confusing and it has been corrected.`
      "
      >?</span
    >
  </div>
</template>

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
    ["gas"]: { required: false, default: "co2" },
    ["aperture"]: { required: false, default: 3.46 },
    ["caption"]: { required: false, default: false },
  },
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
  },
};
</script>
