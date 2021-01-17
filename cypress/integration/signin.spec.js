describe('google login test', () => {
  it('login', () => {
    cy.visit(`?access_token=${Cypress.env('accessToken')}`);
    cy.get('.title').contains('All Garden Sheds');
  })
});