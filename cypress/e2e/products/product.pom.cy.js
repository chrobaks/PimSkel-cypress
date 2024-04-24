class ProductPom
{
    elements = {
        productEditBtn : () => cy.get('button.product_items:first'),
        formNew : () => cy.get('form[name="product"]'),
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
        this.newProduct = this.getNewProduct();

        for (let key in this.config.form) {
            cy.get('#product_' + key).type(this.newProduct[key]);
        }

        cy.wait(1000);
        cy.log('# Run submit form new product');
        cy.get('#product_save').click();
        this.checkAddProductList();
    }

    /**
     * @returns void
     */
    editProduct ()
    {
        cy.log('# Run editProduct and load form in modal view');
        this.elements.productEditBtn().click().then(() => {
            this.updateProduct();
        });
    }

    /**
     * @returns void
     */
    updateProduct ()
    {
        cy.log('# Run updateProduct / update form in modal view');
        cy.get('form.modal-form').within(() => {
            cy.get('input[name="product[name]"]').then(input => {
                input.val(this.config.form.name);
                cy.log(input.attr('name') + '=' + input.val());
            });
            cy.get('textarea').then(textarea => {
                textarea.val(this.config.form.description);
                cy.log(textarea.attr('name') + '=' + textarea.val());
            });
        });
        cy.wait(1000);
        cy.log('# Run updateProduct / submit form');
        cy.get('.modal-footer button.btn-save').click().then(() => {
            cy.get('#modal-body-msg').contains('Product updateAction successfully!');
            this.checkUpdateProductList();
        });
    }

    /**
     * @returns void
     */
    checkUpdateProductList ()
    {
        cy.log('# Run checkProductList');
        cy.get('tr[data-row-id]:first').then(element => {
            for (let key in this.config.form) {
                const val = element.children('[data-form-key="product_' + key + '"]').text();
                if (val && val === this.config.form[key]) {
                    cy.log('Info: Product list updated successful: ' + key + '=' +val);
                } else {
                    cy.log('Error: Product list updated failed: ' + key + '=' +val);
                }
            }
        });
    }

    /**
     * @returns void
     */
    checkAddProductList ()
    {
        cy.log('# Run checkAddProductList');
        cy.get('tr[data-row-id]:last').then(element => {
            for (let key in this.newProduct) {
                const val = element.children('[data-form-key="product_' + key + '"]').text();
                if (val && val === this.newProduct[key]) {
                    cy.log('Info: Product list add successful: ' + key + '=' +val);
                } else {
                    cy.log('Error: Product list add failed: ' + key + '=' +val);
                }
            }
        });
    }

    /**
     *
     * @returns {{name: string, description: string}}
     */
    getNewProduct ()
    {
        const d = new Date();

        return {
            name : 'Product ' + d.getTime(),
            description : 'Product description ' + d.getTime(),
        }
    }
}
module.exports = new ProductPom();