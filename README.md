# PimSkel-cypress
 Cypress e2e Tests for **PimSkel-docker** project.

### @Required

- node ~v21.5.0
- npm ~v10.5.2


### @Install cypress
```bash
$ npm install
```
### @Run PimSkel-docker container
```bash
# Start container after installation
/YOUR_PROJECT_FOLDER/PimSkel-docker$ docker compose start
```

### @Run cypress headless
This run a docker cypress container for individual testing
```bash
# Run add new product test
$ ./cypress-run.sh -p products -f add
```

### @Available test commands
##### Run add new product test
```bash
$ ./cypress-run.sh -p products -f add
```

##### Run edit product test
```bash
$ ./cypress-run.sh -p products -f edit
```

##### Run delete product test
```bash
$ ./cypress-run.sh -p products -f delete
```


### @Open cypress
This open a cypress UI to run tests in a window
```bash
$ cypress open
```

### @Config & @Env
- cypress.config.js
  here find the default env config, if using a cypress.env.json will override existing keys.
```
{
  url_home: 'http://127.0.0.1:8087/',
  url_product: 'http://127.0.0.1:8087/Products',
}
```


- cypress.env.json (optional)
  Create a local cypress.en.json for your local settings if needed.
```
{
  "url_home": "URL_TO_PIMSKEL_SERVER",
  "url_product": "URL_TO_PIMSKEL_SERVER/Products"
}
```


### @Testcases
- **e2e/products/formAddProduct.cy.js**  
  Add a new product to product list in Pimcore

- **e2e/products/formEditProduct.cy.js**  
  Edit an existing product to product list in Pimcore

- **e2e/products/formDeleteProduct.cy.js**  
  Delete an existing product from product list in Pimcore

### Cypress POM product
- **product.pom.cy.js**
  POM Product Class for all product form tests



