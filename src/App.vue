<script>
/**
 * Make-a-ZIF App version 0.9.0
 *
 * Created by SciFY on November 20, 2022.
 *
 * Note: By default the App supports both Light and dark theme. If you want
 * to disable dark mode, just remove @import "./assets/dark.scss"; from this
 * file's <style> imports.
 */
import MazHeader from "./components/MazHeader.vue";
import MazImage from "./components/MazImage.vue";
import MazTabs from "./components/MazTabs.vue";
import MazTableOne from "./components/MazTableOne.vue";
import MazTableTwo from "./components/MazTableTwo.vue";
// Import assets (gas, metals, linkers, functional groups)
import gasData from "./assets/data/gases.json";
import metalData from "./assets/data/metals.json";
import linkerData from "./assets/data/linkers.json";
import groupData from "./assets/data/groups.json";
// Let the Vue begin!
export default {
  components: {
    MazHeader,
    MazImage,
    MazTabs,
    MazTableOne,
    MazTableTwo,
  },
  props: [],
  data() {
    return {
      // Parsed JSON data
      listOfGases: gasData,
      listOfMetals: metalData,
      listOfGroups: groupData,
      listOfLinkers: linkerData,
      // Selected variables of the on-screen scenario:
      selectedScenario: null,
      selectedGas: null,
      selectedMetal: null,
      selectedLinker1: null,
      selectedLinker2: null,
      selectedLinker3: null,
      selectedFuncGroup1: null,
      selectedFuncGroup2: null,
      selectedFuncGroup3: null,
      // Default (aka "example") scenario results based on the mock-ups:
      scenarioResults: {
        name: "Example scenario metrics",
        date: "",
        formattedDate: "5/3/2022 | 12:00:13",
        suggestedName: "Scenario name",
        diameter: 3,
        permeability: 4,
        diffusion: 4,
        scenario: [],
        showDiff: false,
        showSave: false,
      },
      // History (an array of saved scenarios):
      // Starting with false instead of an [] to handle the default states for
      // various components and to avoid boring, lengthy, length counts.
      scenarioHistory: false,
      // Units:
    };
  },
  created() {
    //check if history exists in the local storage.
    let localStorageHistory = window.localStorage.getItem("mazAppHistory");
    console.log("App was Created...");
    if (localStorageHistory) {
      this.scenarioHistory = JSON.parse(localStorageHistory);
      console.log("App loaded scenarios from browser's history");
      // @TODO: Load an actual scenario...
      // this.selectedScenario = this.scenarioHistory[this.scenarioHistory.length - 1];
      this.selectedScenario = this.loadDefaultScenario(); // remove when fixed!
    } else {
      console.log("App loaded default scenario");
      this.selectedScenario = this.loadDefaultScenario();
    }
    this.selectedGas = this.selectedScenario.gas;
    this.selectedMetal = this.selectedScenario.metal;
    this.selectedLinker1 = this.selectedScenario.linker1;
    this.selectedLinker2 = this.selectedScenario.linker2;
    this.selectedLinker3 = this.selectedScenario.linker3;
    this.selectedFuncGroup1 = this.selectedScenario.funcGroup1;
    this.selectedFuncGroup2 = this.selectedScenario.funcGroup2;
    this.selectedFuncGroup3 = this.selectedScenario.funcGroup3;
  },
  computed: {},
  mounted() {},
  methods: {
    currentDate() {
      const current = new Date();
      const month = current.getMonth() + 1;
      const hours = String(current.getHours()).padStart(2, "0");
      const minutes = String(current.getMinutes()).padStart(2, "0");
      const seconds = String(current.getSeconds()).padStart(2, "0");
      const date = `${current.getDate()}/${month}/${current.getFullYear()} | ${hours}:${minutes}:${seconds}`;
      return date;
    },
    refreshMetal(newMetal) {
      console.log("App received metal: " + newMetal);
      this.selectedScenario.metal = newMetal;
    },
    refreshLinkers(newLinkers) {
      console.log("App received linkers:" + newLinkers);
      this.selectedScenario.linker1 = newLinkers.linker1;
      this.selectedScenario.linker2 = newLinkers.linker2;
      this.selectedScenario.linker3 = newLinkers.linker3;
    },
    refreshGroups(newGroups) {
      console.log("App received groups:" + newGroups);
      this.selectedScenario.funcGroup1 = newGroups.group1;
      this.selectedScenario.funcGroup2 = newGroups.group2;
      this.selectedScenario.funcGroup3 = newGroups.group3;
    },
    refreshGas(newGas) {
      console.log("App Received Gas: " + newGas);
      if (newGas) {
        this.selectedScenario.gas = newGas;
      } else {
        // Conditional to determine if a gas was added to selected ZIF.
        // None equals to a radio with a value="" and that is stored as false:
        this.selectedScenario.gas = false;
      }
    },
    /**
     * Executes a given scenario and returns reactive results.
     * @param {obj} scenario - Scenario to execute.
     */
    runScenario(scenario) {
      // Disable execution button until further notice:
      const mazExecuteButton = document.querySelector("#mazExecuteButton");
      mazExecuteButton.classList.add("disabled");
      // Define the results container so we can alter it later on...
      const mazResultsTable = document.querySelector("#mazResultsTable");
      // Scrolls to top in case the results are not into view:
      const scrollTarget = document.querySelector("#mazTabs");
      scrollTarget.scrollIntoView({ behavior: "smooth", block: "center" });
      // Shows Memo tab if not shown.
      // As we can't directly access bootstrap we mimic its actions:
      const tabMemo = document.querySelector("#mazMemoTab");
      const tabHistory = document.querySelector("#mazHistoryTab");
      const divMemo = document.querySelector("#mazMemo");
      const divHistory = document.querySelector("#mazHistory");
      // - Switching the active tabs...
      tabMemo.classList.add("active");
      tabHistory.classList.remove("active");
      // - Switching the active panels...
      divHistory.classList.add("fade");
      divHistory.classList.remove("active", "show");
      divMemo.classList.remove("fade");
      divMemo.classList.add("active", "show");
      // Validating Scenario:
      if (!this.validateScenario(scenario)) {
        return false;
      }
      console.log("App running scenario!");
      let diameter = 0; // in centimeters (@TODO: I guess in nanometers?)
      let permeability = 0; //  ease of passage through the material
      let diffusion = 0; // the most important metric of them all
      // @TODO: Calculate the values above based on a given formula.
      // For arguments shake let's calculate total size in ångström:
      let totalSize =
        scenario.metal.size +
        scenario.linker1.size +
        scenario.linker2.size +
        scenario.linker3.size +
        scenario.funcGroup1.size +
        scenario.funcGroup2.size +
        scenario.funcGroup3.size;
      // Note: 1 ångström = 0.1 nanometre
      diameter = (totalSize * 0.1).toFixed(2);
      // @see https://www.omnicalculator.com/physics/porosity-and-permeability
      permeability = Math.floor(Math.random() * (10 - 1) + 1);
      // @see no idea really
      diffusion = Math.floor(Math.random() * (6 - 1) + 1);
      let results = {
        name: "",
        date: Date.now(),
        formattedDate: this.currentDate(),
        diameter: parseFloat(diameter),
        permeability: permeability,
        diffusion: diffusion,
        scenario: {
          metal: scenario.metal.key,
          linker1: scenario.linker1.key,
          linker2: scenario.linker2.key,
          linker3: scenario.linker3.key,
          funcGroup1: scenario.funcGroup1.key,
          funcGroup2: scenario.funcGroup2.key,
          funcGroup3: scenario.funcGroup3.key,
          gas: scenario.gas ? scenario.gas.key : false,
        },
        showDiff: true,
        showSave: true,
      };
      console.log("App ran scenario with diffusion: " + results.diffusion);
      this.scenarioResults = results;
      // Highlight the new results for a few seconds:
      mazResultsTable.classList.add("executed");
      setTimeout(function () {
        mazResultsTable.classList.remove("executed");
        // @TODO: Obviously execution should be allowed, only if parameters have
        // actually changed. Unique hash from properties is once again a pretty
        // easy solution. Till then, execution is re-enabled after this timeout.
        mazExecuteButton.classList.remove("disabled");
      }, 2500);
      return true;
    },
    /**
     * Validates a ZIF scenario (@TODO: Not implemented yet!).
     * @param {obj} scenario - A scenario to validate.
     */
    validateScenario(scenario) {
      // @TODO: Validation based on minimum amount of required data.
      console.log("App validates scenario...");
      if (!scenario) {
        return false;
      }
      return true;
    },
    /**
     * Delete scenario from browser's local storage (mazAppHistory).
     *
     * Updates: window.localStorage.mazAppHistory. Note: As we are not saving a
     * unique id for each scenario and the rendered history is sorted by date,
     * it's only logical to "acquire" the scenario based on it's epoch until we
     * have a unique hash for each scenario based on its parameters.
     *
     * @param {int} scenarioDate - The saved scenario's date (epoch time).
     */
    deleteScenario(scenarioDate) {
      console.log("App deletes scenario executed on " + scenarioDate);
      // Find scenario on history based on it's date...
      const reqScenario = this.scenarioHistory.find(
        (i) => i.date === scenarioDate
      );
      if (reqScenario) {
        const index = this.scenarioHistory.indexOf(reqScenario);
        if (index > -1) {
          // @TODO: Visualization of removal!
          this.scenarioHistory.splice(index, 1);
          if (this.scenarioHistory.length) {
            // If this history contains at least an item, JSON it...
            window.localStorage.mazAppHistory = JSON.stringify(
              this.scenarioHistory
            );
          } else {
            // Else, remove all traces of history from anywhere...
            window.localStorage.removeItem("mazAppHistory");
            // ... and return to the false default.
            this.scenarioHistory = false;
          }
          return true;
        }
      }
      return false;
      // this.scenarioHistory.remove(scenario);
    },
    /**
     * Saves current scenario in browser's local storage (mazAppHistory).
     * Data are saved at: window.localStorage.mazAppHistory.
     *
     * @param {string} scenarioName - The name of the scenario.
     */
    saveScenario(scenarioName) {
      console.log("App saving scenario!");
      // Validating Scenario:
      if (!this.validateScenario(this.scenarioResults.scenario)) {
        console.log("Can't validate scenario");
        return false;
      }
      this.scenarioResults.name = scenarioName;
      this.scenarioResults.showSave = false;
      // @TODO: Confirmation div!
      // Pushing scenario to history:
      console.log("App pushing scenario to history!");
      if (!this.scenarioHistory) {
        this.scenarioHistory = [];
      }
      this.scenarioHistory.push(this.scenarioResults);
      // Storing scenario to browser's storage:
      window.localStorage.mazAppHistory = JSON.stringify(this.scenarioHistory);
      return true;
    },
    /**
     * Exports a saved scenario to a JSON file.
     * @param {int} scenarioDate - The saved scenario's date (epoch time).
     */
    downloadScenario(scenarioDate) {
      console.log("App sends JSON data to user!");
      // Find scenario on history based on it's date...
      // @TODO: indexScenario should be a function...
      const reqScenario = this.scenarioHistory.find(
        (i) => i.date === scenarioDate
      );
      if (reqScenario) {
        const index = this.scenarioHistory.indexOf(reqScenario);
        if (index > -1) {
          var header =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(reqScenario));
          var anchor = document.createElement("a");
          anchor.setAttribute("href", header);
          anchor.setAttribute("download", `make-a-zif-${scenarioDate}.json`);
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          return true;
        }
      }
      return false;
    },
    /**
     * Loads scenario from browser's local storage.
     * Data are loaded from: window.localStorage.mazAppHistory.
     *
     * @param {int} scenarioDate - The saved scenario's date (epoch time).
     */
    loadScenario(scenarioDate) {
      console.log("App loads scenario executed on " + scenarioDate);
      // Find scenario on history based on it's date...
      // @TODO: indexScenario should be a function...
      const reqScenario = this.scenarioHistory.find(
        (i) => i.date === scenarioDate
      );
      if (reqScenario) {
        const index = this.scenarioHistory.indexOf(reqScenario);
        if (index > -1) {
          // @TODO: Visualization of removal!
          // Load variables from reqScenario.scenario:
          let req = reqScenario.scenario;
          // Restoring components & scenario...
          // I wish we had TypeScript...
          this.selectedMetal = this.listOfMetals.find(
            (i) => i.key === req.metal
          );
          this.selectedLinker1 = this.listOfLinkers.find(
            (i) => i.key === req.linker1
          );
          this.selectedLinker2 = this.listOfLinkers.find(
            (i) => i.key === req.linker2
          );
          this.selectedLinker3 = this.listOfLinkers.find(
            (i) => i.key === req.linker3
          );
          this.selectedFuncGroup1 = this.listOfGroups.find(
            (i) => i.key === req.funcGroup1
          );
          this.selectedFuncGroup2 = this.listOfGroups.find(
            (i) => i.key === req.funcGroup2
          );
          this.selectedFuncGroup3 = this.listOfGroups.find(
            (i) => i.key === req.funcGroup3
          );
          if (req.gas) {
            this.selectedGas = this.listOfGases.find((i) => i.key === req.gas);
            this.selectedScenario.gas = this.selectedGas;
          } else {
            this.selectedGas = false;
            this.selectedScenario.gas = false;
          }
          this.selectedScenario.metal = this.selectedMetal;
          this.selectedScenario.linker1 = this.selectedLinker1;
          this.selectedScenario.linker2 = this.selectedLinker2;
          this.selectedScenario.linker3 = this.selectedLinker3;
          this.selectedScenario.funcGroup1 = this.selectedFuncGroup1;
          this.selectedScenario.funcGroup2 = this.selectedFuncGroup2;
          this.selectedScenario.funcGroup3 = this.selectedFuncGroup3;
          // Running the restored scenario!
          // This will also take us back to "Memo"...
          this.runScenario(this.selectedScenario);
          this.scenarioResults.showSave = false;
          return true;
        }
      }
      return false;
    },
    /**
     * Loads the default (example scenario) as set by the App.
     * @constructor
     */
    loadDefaultScenario() {
      // The default (example) ZIF is created using the following variables:
      let defaultMetal = this.listOfMetals.find((i) => i.key === "zn2plus");
      let defaultLinker = this.listOfLinkers.find((i) => i.key === "mlm");
      let defaultGroup = this.listOfGroups.find((i) => i.key === "ch3");
      let defaultGas = false;
      let selectedScenario = {
        metal: defaultMetal,
        linker1: defaultLinker,
        linker2: defaultLinker,
        linker3: defaultLinker,
        funcGroup1: defaultGroup,
        funcGroup2: defaultGroup,
        funcGroup3: defaultGroup,
        gas: defaultGas,
      };
      if (!this.validateScenario(selectedScenario)) {
        throw new Error("Default scenario is invalid!");
      }
      return selectedScenario;
    },
  },
};
</script>

<template>
  <div class="maz-header" id="mazApp">
    <div class="wrapper">
      <MazHeader
        header="Make-a-ZIF"
        subHeader="A tool to design ZIFs for gas seperations"
      />
    </div>
  </div>

  <div class="maz-main">
    <div class="maz-generator mt-4 gx-0 container-fluid">
      <div class="row">
        <MazImage />
        <MazTabs
          :scenario-results="scenarioResults"
          :scenario-history="scenarioHistory"
          @do:delete-scenario="deleteScenario"
          @do:download-scenario.once="downloadScenario"
          @do:load-scenario="loadScenario"
          @do:save-scenario="saveScenario"
        />
      </div>
    </div>
    <MazTableOne
      :selected-scenario="selectedScenario"
      :list-of-metals="listOfMetals"
      :list-of-linkers="listOfLinkers"
      :list-of-groups="listOfGroups"
      @update:selected-metal="refreshMetal"
      @update:selected-linkers="refreshLinkers"
      @update:selected-groups="refreshGroups"
    />
    <MazTableTwo
      :selected-scenario="selectedScenario"
      :list-of-gases="listOfGases"
      @update:selected-gas="refreshGas"
    />
    <div class="maz-execution">
      <button
        id="mazExecuteButton"
        class="btn primary"
        type="button"
        title="Execute scenario"
        @click="runScenario(this.selectedScenario)"
      >
        Execution
      </button>
    </div>
  </div>
</template>

<style lang="scss">
/* Import Make-a-ZIF App's Main stylesheets (also imports base.scss): */
@import "./assets/main.scss";
/* Import Make-a-ZIF App's Dark Theme support */
@import "./assets/dark.scss";
/* 2. Import Bootstrap's CSS (@TODO: Should we remove it from Production?): */
@import "~bootstrap/scss/bootstrap";
/* 3. Default body & reset (@TODO: Should we remove it from Production?): */
@import "./assets/default.scss";
</style>
