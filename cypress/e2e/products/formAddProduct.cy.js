import ProductPom from "./product.pom.cy"

describe('Test Product form add', () => {
    it('Add new product', () => {
        cy.visit('http://127.0.0.1:8087/Products');
        ProductPom.addProduct();
    });
});