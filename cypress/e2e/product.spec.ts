describe('Product detail', () => {
  it('navigates to a product and adds to cart', () => {
    cy.visit('/')

    cy.get('.products-grid .product-card').first().within(() => {
      cy.get('.product-card-link').click()
    })

    cy.location('pathname').should('match', /\/product\/[0-9]+/)
    cy.get('.detail-title').should('exist')
    cy.get('.add-to-cart-btn').click()
    cy.get('.add-to-cart-btn').should('contain', 'Added')
  })
})
