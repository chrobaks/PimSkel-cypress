import ProductPom from "../../pom/product.pom.cy"

describe('Test Product update', () => {
    it('Load product in modal form and make update', () => {
        cy.visit(Cypress.env('url_product'));
        ProductPom.editProduct();
    });
});