import ProductPom from "./product.pom.cy"

describe('Test Product update', () => {
    it('Load product in modal form and make update', () => {
        cy.visit('http://127.0.0.1:8087/Products');
        ProductPom.editProduct();
    });
});