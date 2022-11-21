# make-a-zif-app

I promised that I won't write even a single line of documentation, unless I've been asked to do so. Regardless, here's what you would have to know: This code is in alpha stage and here's what is missing:

- Missing proper names & values for metals, organic linkers, functional groups and gases: All the data were based on initial mock-ups and therefore they are only set as an example. Correct values should be entered on the JSON files located at src/data.
- Missing units: These are also based on the mock-ups and therefore we are not even sure about the units and what exactly it has to be measured (length, distance, sizes)? We've assumed that metals, organic linkers and functional groups are using daltons for mass (u) and angstroms for "size". What about the gasses though?
- Missing formula: We have no formula, so there are no actual calculations. We are also not sure about what we do have to calculate and in what unit. For example, on the mock-ups the calculated diameter was presented in centimetres. I've opted for nanometres instead. I am not sure about the unit for permeability (if there is any).
- Missing visualisation: The image provided is static.

Here's what is actually working:

- Interface. Well, we have to start with something. Vue is wonderful.
- Interface details: See how cool the delete button is on History. Check the hover actions on columns (which had to be custom made as CSS can only target rows for hovering effects).
- Light (default) theme and dark theme - just set your desktop to dark and enjoy.

And that's why this app is still in alpha and if you are reading this, then thank you.

Also, I have been asked to not write any documentantion unless someone asks me to do so, therefore this README.md is simply a figment of your imagination or my personal diary.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
