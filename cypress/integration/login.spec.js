describe('google login test', () => {
  it('login', () => {
    cy.visit(`?access_token=${Cypress.env('accessToken')}`);
    cy.get('.thumbnails-container')
    cy.get('.garden-shed-wrapper').its('length').should('eq', 5);
  })
});