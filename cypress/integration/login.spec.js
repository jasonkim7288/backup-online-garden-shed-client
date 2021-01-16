describe('google login test', () => {
  it('login', () => {
    cy.visit('http://localhost:3000');
    cy.get('.google').click();
  })
});