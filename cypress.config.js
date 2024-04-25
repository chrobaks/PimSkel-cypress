const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    env: {
        url_home: 'http://127.0.0.1:8087/',
        url_product: 'http://127.0.0.1:8087/Products',
    },
});
