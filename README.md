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

### @Open cypress
```bash
$ cypress open
```

### @Testcases
- **e2e/products/formAddProduct.cy.js**  
  Add a new product to product list in Pimcore

- **e2e/products/formEditProduct.cy.js**  
  Edit an existing product to product list in Pimcore

### Cypress POM product
- **product.pom.cy.js**
  POM Product Class for all product form tests



