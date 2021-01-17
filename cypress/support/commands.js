// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("signin", () => {
  cy.visit(`?access_token=${Cypress.env('accessToken')}`);
  cy.get('.title').contains('All Garden Sheds');
  cy.wait(2000)
  cy.get('[data-cy=mobile-menu]').click();
  cy.get('[data-cy=mobile-menu-create-record]').click();
});

Cypress.Commands.add("searchCorrectPlant", () => {
  cy.get('.input-content')
    .type('rose');
  cy.get('[data-cy=submit-plant-search]').click();
});
