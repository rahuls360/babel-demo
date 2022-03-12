# Testing Babel with rollup

Trying to better understand how to transpile/add polyfills for next generation javascript features

## Folder structure

- /public
  - index.html -> A simple HTML file that loads bundle.js
  - bundle.js -> Our compiled JS file
- src/main.js -> Our entry file, where we add code which uses new JS features
- babel.config.js -> babel config
- rollup.config.js -> our bundler

## Important pointers

- Disabling caching in IE
  - Internet options -> General -> Settings -> Every time I visit the webpage https://stackoverflow.com/a/21581823/6127580
  - Network -> Always refresh from server https://stackoverflow.com/a/29146691/6127580
- Ensure IE's versions is same as mentioned
  - Terminal -> Emulation -> check if same mode as mentioned (otherwise may face issues with polyfills & browserslist, etc)

## Workflow to validate

- `npm run dev` -> starts local server on port 3000
- Add new JS features in main.js, test it on IE11
- Check the bundle.js code, if code is transpiled/polyfill added
- Check logs in terminal & research & make changes (then validate)

## Notes

- rollup
  - `resolve()` -> helps the bundler know how to actually import the stuff/libraries you use in your code
  - `commonjs()` -> converts commonJS code to ES modules
  - `babel()` -> transpiles/adds polyfills to the imported code
  - It is critical that babel's plugin comes after resolve and commonjs plugins
  - We need to exclude the contents of node_modules (to avoid transpiling them/adding polyfills for them)
  - We use a minifier in production -> via terser
- babel config
  - babel/preset-env -> handles most of the transpiling/polyfilling
  - debug: true -> logs useful information to the terminal
  - useBuiltIns
    - false -> no polyfills added
    - entry -> add polyfills based on supported browsers list
    - usage -> dynamically adds polyfills needed based on code(found via your entry file) & support browsers list (targets)
  - corejs -> which version of core.js to use (needs to be installed via normal dependency, as imported into source code)
  - targets -> specify browsers to polyfill/transpile for
  - We can also use .browserlistrc file (test via npx browserslist. Refer https://browserslist.dev/ for checking versions/coverage)
