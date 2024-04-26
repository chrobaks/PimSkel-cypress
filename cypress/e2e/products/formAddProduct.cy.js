import ProductPom from "../../pom/product.pom.cy"

describe('Test Product form add', () => {
    it('Add new product', () => {
        cy.visit(Cypress.env('url_product'));
        ProductPom.addProduct();
    });
});