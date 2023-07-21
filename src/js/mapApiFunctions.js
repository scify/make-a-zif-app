/**
 * Maps a Make-a-ZIF API v1.0 metal object to the optimal structure.
 * @param {Object} gas - The API metal object to be mapped.
 * @returns {Object} The transformed group object.
 */
export function mapApiGases(gas) {
  return {
    key: gas.key,
    name: gas.name,
    title: gas.title,
    acentricFactor: gas.ascentricF,
    kineticDiameter: {
      name: "kinetic diameter",
      unit: {
        name: "angstrom",
        sign: "\u00C5",
      },
      value: gas.kdiameter,
    },
    mass: {
      name: "mass",
      unit: {
        name: "gram per mol",
        sign: "g/mol",
      },
      value: gas.mass,
    },
    size: {
      name: "vdW diameter",
      unit: {
        name: "angstrom",
        sign: "\u00C5",
      },
      value: gas.diameter,
    },
  };
}

/**
 * Maps a Make-a-ZIF API v1.0 metal object to the optimal structure.
 * @param {Object} metal - The API metal object to be mapped.
 * @returns {Object} The transformed group object.
 */
export function mapApiMetals(metal) {
  return {
    key: metal.key,
    name: metal.name,
    title: metal.title,
    number: metal.metalNum,
    mass: {
      name: "metal mass",
      unit: {
        name: "dalton",
        sign: "u",
      },
      value: metal.metalMass,
    },
    size: {
      name: "ionic radius",
      unit: {
        name: "picometer",
        sign: "pm",
      },
      value: metal.ionicRad,
    },
  };
}

/**
 * Maps a Make-a-ZIF API v1.0 f_group object to the optimal structure.
 * @param {Object} group - The API f_group object to be mapped.
 * @returns {Object} The transformed group object.
 */
export function mapApiGroups(group) {
  return {
    key: group.key,
    name: "\u2013" + group.name,
    title: group.title,
    mass: {
      name: "mass",
      unit: {
        name: "dalton",
        sign: "u",
      },
      value: group.f_group_mass,
    },
    size: {
      name: "length",
      unit: {
        name: "angstrom",
        sign: "\u00C5",
      },
      value: group.f_group_length,
    },
  };
}

/**
 * Maps a Make-a-ZIF API v1.0 linker object to the optimal structure.
 * @param {Object} linker - The API linker object to be mapped.
 * @returns {Object} The transformed linker object.
 */
export function mapApiLinkers(linker) {
  return {
    key: linker.key,
    name: linker.name,
    title: linker.title,
    // Distance (σ) at which intermolecular potential between particles is 0.
    distance: {
      name: "\u03c3",
      unit: {
        name: "angstrom",
        sign: "\u00C5",
      },
      value: linker["s_1"],
    },
    energy: {
      name: "e",
      unit: {
        name: "kilojoule per mol",
        sign: "kJ/mol",
      },
      value: linker["e_1"],
    },
    mass: {
      name: "mass",
      unit: {
        name: "dalton",
        sign: "u",
      },
      value: linker["linker_mass"],
    },
    size: {
      name: "length",
      unit: {
        name: "angstrom",
        sign: "\u00C5",
      },
      value: linker["linker_length"],
    },
  };
}
