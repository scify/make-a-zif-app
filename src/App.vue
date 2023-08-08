<script>
/**
 * Make-a-ZIF App
 *
 * Created by SciFY on November 2022-August 2023.
 *
 * Note: By default the App supports both light and dark theme. If dark mode
 * needs to be disabled, just remove @import "./assets/dark.scss"; from this
 * file's <style> imports.
 */
import MazHeader from "./components/MazHeader.vue";
import MazTabs from "./components/MazTabs.vue";
// import MazImage from "./components/MazImage.vue";
// import MazTabs from "./components/obsolete/MazTabs.vue";
import MazTableOne from "./components/MazTableOne.vue";
import MazTableTwo from "./components/MazTableTwo.vue";
// Import default assets (gas, metals, linkers, functional groups):
import gasData from "./assets/data/gases.json";
import metalData from "./assets/data/metals.json";
import linkerData from "./assets/data/linkers.json";
import groupData from "./assets/data/groups.json";
/* Import mapping for API v1.0.0 metadata:
import {
  mapApiLinkers,
  mapApiGases,
  mapApiGroups,
  mapApiMetals,
} from "./js/mapApiFunctions.js";
*/

// Let the Vue begin!
export default {
  components: {
    MazHeader, // A very basic header.
    MazTabs, // Introduction, tutorials & history.
    // MazImage, // A very basic image of a ZIF.
    // MazTabs, // Memo & History Tabs, next to the image.
    MazTableOne, // Allows selection of Metals, Linkers & Groups.
    MazTableTwo, // Allows selection of Gas elements.
  },
  props: [],
  data() {
    return {
      // Local cached version of initial data.
      modelVersion: "1.0.1 local",
      // Local parsed JSON data of various constants.
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
      // Default (aka "example") scenario results:
      scenarioResults: {
        name: "Example scenario",
        date: new Date("2022-03-05T10:00:13.912Z"),
        formattedDate: "5/3/2022 | 12:00:13",
        suggestedName: "Scenario name",
        diffusion: 4,
        scenario: [],
        showDiff: false,
        showSave: false,
      },
      // History (an array of saved scenarios):
      // Starting with false instead of an [] to handle the default states for
      // various components and to avoid boring, lengthy, length counts.
      scenarioHistory: false,
    };
  },
  created() {
    // Checks if history exists in local storage:
    console.log("App was Created...");
    this.resetToLocalOrDefault();
  },
  computed: {},
  mounted() {
    this.fetchDataConstantsFromAPI();
  },
  methods: {
    resetToLocalOrDefault() {
      const localStorageHistory = window.localStorage.getItem("mazAppHistory");
      if (localStorageHistory) {
        this.scenarioHistory = JSON.parse(localStorageHistory);
        console.log("App loaded scenarios from browser's history");
        const lastScenario =
          this.scenarioHistory[this.scenarioHistory.length - 1];
        this.selectedScenario = this.createScenario();
        this.loadScenario(lastScenario.date, false);
      } else {
        console.log("App loaded default scenario");
        this.applyScenario(this.createScenario());
      }
    },

    fetchDataConstantsFromAPI() {
      fetch(import.meta.env.VITE_MAZ_API_ENDPOINT + "params")
        .then((response) => response.json())
        .then((data) => {
          this.modelVersion = data.model_version;
          // @example Download: this.downloadJsonData(this.listOfGases, "gases");
          // @example Mapping: = data.gases.map((gas) => mapApiGases(gas));
          this.listOfGases = data.gases;
          this.listOfMetals = data.metals;
          this.listOfGroups = data.f_groups;
          this.listOfLinkers = data.linkers;
          this.resetToLocalOrDefault();
        })
        .catch((error) => {
          // Handle any errors that occurs during the fetch request:
          // @TODO: Handle specific errors in specific ways.
          console.error("Error fetching remote data:", error);
        })
        .finally(() => {
          console.log("App initialised successfully!");
        });
    },

    fetchDataResultsFromAPI(apiParams, scenarioData) {
      fetch(import.meta.env.VITE_MAZ_API_ENDPOINT + "predict?" + apiParams, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok!");
          }
          return response.json();
        })
        .then((data) => {
          if (data && typeof data.diffusivity === "number") {
            this.handlePredictionResponseData(data.diffusivity, scenarioData);
          } else {
            throw new Error(
              "Invalid API response data or missing diffusivity key!"
            );
          }
        })
        .catch((error) => {
          // Handle any errors that occurs during the fetch request:
          // @TODO: Handle specific errors in specific ways.
          console.error("Error fetching data:", error);
        });
      return true;
    },

    currentDate() {
      const current = new Date();
      const month = current.getMonth() + 1;
      const hours = String(current.getHours()).padStart(2, "0");
      const minutes = String(current.getMinutes()).padStart(2, "0");
      const seconds = String(current.getSeconds()).padStart(2, "0");
      return `${current.getDate()}/${month}/${current.getFullYear()} | ${hours}:${minutes}:${seconds}`;
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
     * Forces the user to select a Gas by activating the corresponding modal.
     */
    forceGasSelection() {
      const gasModalButton = document.getElementById("gasModalButton");
      const gasModal = document.getElementById("gasModal");
      gasModalButton.click();
      gasModal.classList.add("warning");
    },

    /**
     * Focus (activate) a Tab and the corresponding panel (uses Bootstrap).
     * @param {string} pane - One of the apps panes (Intro, Examples, History).
     */
    focusTab(pane = "History") {
      const appTabs = document.querySelector("#mazTabs");
      const appTabPanels = document.querySelector("#mazTabPanels");
      const focusTab = document.querySelector(`#maz${pane}Tab`);
      const focusPane = document.querySelector(`#maz${pane}Pane`);
      // Scrolls to top in case the results are not into view:
      appTabs.scrollIntoView({ behavior: "smooth", block: "center" });
      // Switching active tabs...
      appTabs
        .querySelectorAll("button")
        .forEach((tab) => tab.classList.remove("active"));
      appTabPanels
        .querySelectorAll("[role='tabpanel']")
        .forEach((panel) => panel.classList.remove("show", "active"));
      focusTab.classList.add("active");
      focusPane.classList.add("show", "active");
    },

    /**
     * Executes a given scenario and returns reactive results.
     * @param {Object} scenario - Scenario to execute.
     */
    runScenario(scenario) {
      // Disable execution button until further notice:
      document.querySelector("#mazExecuteButton").classList.add("disabled");
      // Toggle gas if no gas selected and abort.
      if (!scenario.gas) {
        this.forceGasSelection();
        return false;
      }
      // Validating Scenario:
      if (!this.validateScenario(scenario)) {
        return false;
      }
      // Running scenario via API:
      console.log("App running scenario!");
      let scenarioData = {
        metal: scenario.metal.key,
        linker1: scenario.linker1.key,
        linker2: scenario.linker2.key,
        linker3: scenario.linker3.key,
        funcGroup1: scenario.funcGroup1.key,
        funcGroup2: scenario.funcGroup2.key,
        funcGroup3: scenario.funcGroup3.key,
        gas: scenario.gas ? scenario.gas.key : false,
      };
      const apiMapping = {
        funcGroup1: "f_group1",
        funcGroup2: "f_group2",
        funcGroup3: "f_group3",
      };
      let apiScenario = {};
      for (const key in scenarioData) {
        if (apiMapping[key]) {
          apiScenario[apiMapping[key]] = scenarioData[key];
        } else {
          apiScenario[key] = scenarioData[key];
        }
      }
      const apiParams = Object.keys(apiScenario)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(apiScenario[key])}`
        )
        .join("&");
      // Fetches results & handles prediction.
      if (this.fetchDataResultsFromAPI(apiParams, scenarioData)) {
        // Focus on results!
        this.focusTab();
        return true;
      }
      return false;
    },

    /**
     * Handles prediction response data. Some random text will go here.
     */
    handlePredictionResponseData(diffusivity, scenarioData) {
      if (typeof diffusivity === "number") {
        const diffusivityValue = parseFloat(diffusivity);
        if (!isNaN(diffusivityValue)) {
          let results = {
            name: "",
            date: new Date().toISOString(),
            formattedDate: this.currentDate(),
            model: this.modelVersion.toString(),
            source: window.location.href.toString(),
            diffusion: diffusivityValue,
            scenario: scenarioData,
            showDiff: true,
            showSave: true,
          };
          console.log("App ran scenario with diffusivity: " + diffusivityValue);
          this.scenarioResults = results;
        } else {
          throw new Error("Invalid diffusivity value received from the API");
        }
      } else {
        throw new Error("Invalid API response data or missing diffusivity key");
      }
      return true;
    },

    /**
     * Download (non-unicode) JSON data.
     * @param {array} dataArray An array of data.
     * @param {string} fileName The name of the file (=data).
     * @param {string} fileExtension The extension of the file (=json).
     */
    downloadJsonData(dataArray, fileName = "data", fileExtension = "json") {
      const json = encodeURIComponent(JSON.stringify(dataArray, null, 2));
      const output = "data:application/json;charset=utf-8," + json;
      const anchor = document.createElement("a");
      anchor.href = output;
      anchor.download = fileName + "." + fileExtension;
      // document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      return true;
    },

    /**
     * Creates a Scenario: Create a Scenario by parsing the input of the keys
     * for metals, linkers & functional groups. The returned object (a Scenario)
     * includes all the required units and their properties ready to be
     * processed by other methods of this App. If no parameters are set, then
     * the Scenario with the default units ('Example Scenario') is returned.
     * @param {string} metal Metal key.
     * @param {string} linker1 Linker 1 key.
     * @param {string} linker2 Linker 2 key.
     * @param {string} linker3 Linker 3 key.
     * @param {string} funcGroup1 Functional Group 1 key.
     * @param {string} funcGroup2 Functional Group 2 key.
     * @param {string} funcGroup3 Functional Group 3 key.
     * @param {string|false} gas Gas key.
     * @return {Object} Scenario (objects of units).
     */
    createScenario({
      metal = "zn",
      linker1 = "mlm",
      linker2 = "mlm",
      linker3 = "mlm",
      funcGroup1 = "ch3",
      funcGroup2 = "ch3",
      funcGroup3 = "ch3",
      gas = false,
    } = {}) {
      let metalObject = this.listOfMetals.find((i) => i.key === metal);
      let linker1Object = this.listOfLinkers.find((i) => i.key === linker1);
      let linker2Object = this.listOfLinkers.find((i) => i.key === linker2);
      let linker3Object = this.listOfLinkers.find((i) => i.key === linker3);
      let funcGroup1Object = this.listOfGroups.find(
        (i) => i.key === funcGroup1
      );
      let funcGroup2Object = this.listOfGroups.find(
        (i) => i.key === funcGroup2
      );
      let funcGroup3Object = this.listOfGroups.find(
        (i) => i.key === funcGroup3
      );
      // No need to validate gas as example scenario does not have any.
      if (
        !metalObject ||
        !linker1Object ||
        !linker2Object ||
        !linker3Object ||
        !funcGroup1Object ||
        !funcGroup2Object ||
        !funcGroup3Object
      ) {
        throw new Error("Can't create a scenario!");
      }
      return {
        metal: metalObject,
        linker1: linker1Object,
        linker2: linker2Object,
        linker3: linker3Object,
        funcGroup1: funcGroup1Object,
        funcGroup2: funcGroup2Object,
        funcGroup3: funcGroup3Object,
        gas:
          gas !== false ? this.listOfGases.find((i) => i.key === gas) : false,
      };
    },

    /**
     * Applies a Scenario to the UI: Alters the app's inputs to set them to the
     * ones "selected" by the Scenario (which is created via createScenario() ).
     * @param {Object} scenario Scenario (objects of units).
     * @return {boolean} - True/false.
     */
    applyScenario(scenario) {
      this.selectedScenario = scenario;
      this.selectedMetal = this.selectedScenario.metal;
      this.selectedLinker1 = this.selectedScenario.linker1;
      this.selectedLinker2 = this.selectedScenario.linker2;
      this.selectedLinker3 = this.selectedScenario.linker3;
      this.selectedFuncGroup1 = this.selectedScenario.funcGroup1;
      this.selectedFuncGroup2 = this.selectedScenario.funcGroup2;
      this.selectedFuncGroup3 = this.selectedScenario.funcGroup3;
      this.selectedGas = this.selectedScenario.gas;
      return true;
    },

    /**
     * Loads a Scenario (its keys) from browser's local storage. Data are loaded
     * from: window.localStorage.mazAppHistory (mazAppHistory).
     *
     * @param {int} scenarioDate - The saved scenario's date (epoch time).
     * @param {boolean} execution - Execute loaded scenario? (default: true).
     */
    loadScenario(scenarioDate, execution = true) {
      console.log("App loads scenario executed on " + scenarioDate);
      // Find scenario on history based on its date...
      const scenarioData = this.scenarioHistory.find(
        (i) => i.date === scenarioDate
      );
      if (scenarioData) {
        const index = this.scenarioHistory.indexOf(scenarioData);
        if (index > -1) {
          this.applyScenario(this.createScenario({ ...scenarioData.scenario }));
          if (document.querySelector("#mazExecuteButton") && execution) {
            // Running the restored scenario: This also takes us back to "Memo".
            this.runScenario(this.selectedScenario);
            this.scenarioResults.showSave = false;
          }
          return true;
        }
      }
      return false;
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
      // @TODO: Save scenario confirmation (via a bootstrap component).
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
     * Exports a saved scenario from browser's local storage (mazAppHistory).
     * @param {int} scenarioDate - The saved scenario's date (epoch time).
     */
    exportScenario(scenarioDate) {
      // Find scenario on history based on its date...
      const scenario = this.scenarioHistory.find(
        (i) => i.date === scenarioDate
      );
      if (scenario) {
        const index = this.scenarioHistory.indexOf(scenario);
        if (index > -1) {
          this.downloadJsonData(scenario, `make-a-zif-${scenarioDate}`);
          return true;
        }
      }
      return false;
    },

    /**
     * Delete scenario from browser's local storage (mazAppHistory).
     *
     * Updates: window.localStorage.mazAppHistory. Note: As we are not saving a
     * unique id for each scenario and the rendered history is sorted by date,
     * it's only logical to "acquire" the scenario based on its epoch until we
     * have a unique hash for each scenario based on its parameters.
     *
     * @param {int} scenarioDate - The saved scenario's date (epoch time).
     */
    deleteScenario(scenarioDate) {
      console.log("App deletes scenario executed on " + scenarioDate);
      // Find scenario on history based on its date...
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
     * Validates a ZIF scenario (@TODO: Not implemented yet!).
     * @param {Object} scenario - A scenario to validate.
     */
    validateScenario(scenario) {
      // @TODO: Validation based on minimum amount of required data.
      console.log("App validates scenario...");
      if (!scenario) {
        return false;
      }
      if (!scenario.gas) {
        return false;
      }
      return true;
    },
  },
};
</script>

<template>
  <div class="maz-header" id="mazApp">
    <div class="wrapper">
      <MazHeader
        header="Make-a-ZIF"
        subHeader="A tool to design ZIFs for gas separations"
        :modelVersion="modelVersion"
      />
    </div>
  </div>

  <div class="maz-introduction">
    <MazTabs
      :scenario-results="scenarioResults"
      :scenario-history="scenarioHistory"
      @do:delete-scenario="deleteScenario"
      @do:download-scenario.once="exportScenario"
      @do:load-scenario="loadScenario"
      @do:save-scenario="saveScenario"
    />
  </div>

  <div class="maz-main">
    <!--
    <div class="maz-generator mt-4 gx-2 container-fluid">
      <div class="row">
        <MazImage />
        <MazTabs
          :scenario-results="scenarioResults"
          :scenario-history="scenarioHistory"
          @do:delete-scenario="deleteScenario"
          @do:download-scenario.once="exportScenario"
          @do:load-scenario="loadScenario"
          @do:save-scenario="saveScenario"
        />
      </div>
    </div>
    -->
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
/* 1. Import Make-a-ZIF App's Main stylesheets (also imports base.scss): */
@import "./assets/main.scss";
/* 2. Import Make-a-ZIF App's Dark Theme support */
@import "./assets/dark.scss";
/* 3. Import Bootstrap's CSS (@TODO: Should it be removed from Production?): */
@import "~bootstrap/scss/bootstrap";
/* 4. Default body & reset (@TODO: Should it be removed from Production?): */
@import "./assets/default.scss";
</style>
