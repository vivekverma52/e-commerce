describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows products grid and can search', () => {
    cy.get('.products-grid').should('exist')
    cy.get('.results-count').should('exist')
    cy.get('.search-input').type('shirt')
    cy.get('.products-grid').should('exist')
  })

  it('can filter by category', () => {
    cy.get('.filter-categories .cat-chip').eq(1).click()
    cy.get('.products-grid').should('exist')
  })
})
