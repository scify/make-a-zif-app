<script>
export default {
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
<template>
  <div class="table-responsive">
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Metal</th>
          <th scope="col" colspan="3">Organic linkers</th>
          <th scope="col" colspan="3">Functional groups</th>
          <th scope="col">Aperture</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Name</th>
          <td v-html="getMetal(this.metal).name"></td>
          <td v-html="getLinker(this.linker1).name"></td>
          <td v-html="getLinker(this.linker2).name"></td>
          <td v-html="getLinker(this.linker3).name"></td>
          <td v-html="getGroup(this.group1).name"></td>
          <td v-html="getGroup(this.group2).name"></td>
          <td v-html="getGroup(this.group3).name"></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Mass</th>
          <td>{{ getMetal(this.metal).mass.value }}</td>
          <td>{{ getLinker(this.linker1).mass.value }}</td>
          <td>{{ getLinker(this.linker2).mass.value }}</td>
          <td>{{ getLinker(this.linker3).mass.value }}</td>
          <td>{{ getGroup(this.group1).mass.value }}</td>
          <td>{{ getGroup(this.group2).mass.value }}</td>
          <td>{{ getGroup(this.group3).mass.value }}</td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Length</th>
          <td>—</td>
          <td>{{ getLinker(this.linker1).size.value }}</td>
          <td>{{ getLinker(this.linker2).size.value }}</td>
          <td>{{ getLinker(this.linker3).size.value }}</td>
          <td>{{ getGroup(this.group1).size.value }}</td>
          <td>{{ getGroup(this.group2).size.value }}</td>
          <td>{{ getGroup(this.group3).size.value }}</td>
          <td>
            {{ this.aperture }}
            <!-- @TODO -->
            <span
              class="alert-warning alert"
              title="Is this the ZIF's aperture? If yes, it should be out of this table. On this table, this value is interpreted like 'The aperture's length is 3.46' which does not make sense."
              >?</span
            >
          </td>
        </tr>
      </tbody>
    </table>
    Gas diffusivities (10<sup>-10</sup> m<sup>2</sup>/s)
    <!-- @TODO -->
    <span
      class="alert-warning alert"
      title="Please confirm that this unit (of measurement) is correct & that it also applies to the Executed ZIF diffusivities (aka the number that the API provides as 'diffusivity') so it can be added there as well! Is this the 'D'? (aka the diffusion coefficient in gas)? Should the temperature be specified? Also note that on the original examples measurements units were not differentiated from structural units (of the ZIF). This issue has already been fixed."
      >?</span
    >
  </div>
</template>
