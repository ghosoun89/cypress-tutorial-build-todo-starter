Cypress.Commands.add('seedAndVisit', (fixture = 'todos.json') => { 
    cy.intercept('GET', '/api/todos', {fixture: fixture});
    cy.visit('/');
 })

 Cypress.Commands.add('stubAndVisit', (object) =>{
    cy.intercept('GET', '/api/todos', object)
      cy.visit('/')
 })
