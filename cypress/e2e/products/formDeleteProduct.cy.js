import ProductPom from "./product.pom.cy"

describe('Test Product form delete', () => {
    it('Delete product', () => {
        cy.visit(Cypress.env('url_product'));
        ProductPom.deleteProduct();
    });
});