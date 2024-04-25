class ProductPom
{
    elements = {
        productEditBtn : () => cy.get('button.product_update:first'),
        productDeleteBtn : () => cy.get('button.product_delete:last'),
    };

    config = {
        form : {
            name: 'cypress',
            description: 'cypress description',
        },
    };

    /**
     * @returns void
     */
    addProduct ()
    {
        cy.log('# Run addProduct');
        const product = this.getProduct('add');

        for (let key in product) {
            cy.get('#product_' + key).type(product[key]);
        }

        cy.wait(1000);
        cy.log('# Run submit form new product');
        cy.get('#product_save').click();
        this.checkProductList('last', product);
    }

    /**
     * @returns void
     */
    editProduct ()
    {
        cy.log('# Run editProduct and load form in modal view');
        const product = this.getProduct('');
        this.elements.productEditBtn().click().then(() => {
            cy.log('# Run updateProduct / update form in modal view');
            cy.get('form.modal-form').within(() => {
                cy.get('input[name="product[name]"]').then(input => {
                    input.val(product.name);
                    cy.log(input.attr('name') + '=' + input.val());
                });
                cy.get('textarea').then(textarea => {
                    textarea.val(product.description);
                    cy.log(textarea.attr('name') + '=' + textarea.val());
                });
            });
            cy.wait(1000);
            cy.log('# Run updateProduct / submit form');
            cy.get('.modal-footer button.btn-save').click().then(() => {
                cy.get('#modal-body-msg').contains('Product updateAction successfully!');
                this.checkProductList('eq(0)', product);
            });
        });
    }

    /**
     * @returns void
     */
    deleteProduct ()
    {
        cy.log('# Run deleteProduct');
        this.elements.productDeleteBtn().click().then(btn => {
            const productId = btn.attr('data-product-id');
            cy.get('#modalData').contains('Product deleted successfully.').then(() => {
                let isDeleted = true;
                cy.get('tr[data-row-id]').each(row => {
                    if (row.attr('data-row-id') === productId) {
                        isDeleted = false;
                        return false;
                    }
                });
                const log = (isDeleted)
                    ? 'Product deleted successful and remove from product list'
                    : 'Product deleted successful but failed to removed from product list';
                cy.log(log);
            });
        });
    }

    /**
     * @returns void
     */
    checkProductList (rowIndex, product)
    {
        cy.log('# Run checkAddProductList');
        cy.get('tr[data-row-id]:'+rowIndex).then(element => {
            for (let key in product) {
                const val = element.children('[data-form-key="product_' + key + '"]').text();
                if (val && val === product[key]) {
                    cy.log('Info: Product list check successful: ' + key + '=' +val);
                } else {
                    cy.log('Error: Product list check failed: ' + key + '=' +val);
                }
            }
        });
    }

    /**
     *
     * @returns {{name: string, description: string}}
     */
    getProduct (action)
    {
        if (action === 'add') { // Get new product
            const d = new Date(); // Need Date for a timestamp
            return {
                name: 'Product ' + d.getTime(),
                description: 'Product description ' + d.getTime(),
            }
        } else { // Edit product with default values
            return {...this.config.form};
        }
    }
}
module.exports = new ProductPom();