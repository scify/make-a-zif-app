# make-a-zif-app

I promised that I won't write even a single line of documentation, unless I've been asked to do so. Regardless, here's what you would have to know: This code is in beta stage and here's what is missing:

- Missing visualisation: The image provided is static.
- Fine-tuned UI to compensate for results with no annotation.
- 
Here's what is actually working:

- Interface. Well, we have to start with something.
- Interface details: See how cool the delete button is on History. Check the hover actions on columns (which had to be custom-made as CSS can only target rows for hovering effects).
- Light (default) theme and dark theme - just set your desktop to dark and enjoy.

And that's why this app is still in alpha and if you are reading this, then thank you.

Also, I have been asked to not write any documentation unless someone asks me to do so, therefore this README.md is simply a figment of your imagination or my personal diary.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

Use this project's version of Node.js:

```sh
nvm use
```

Install the project:

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
nvm use
```

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
