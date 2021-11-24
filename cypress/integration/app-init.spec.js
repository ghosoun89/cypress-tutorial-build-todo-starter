describe('app initialization', () =>{
    it('Loads todos on page load', () =>{
        cy.seedAndVisit();
        cy.get('.todo-list li').should('have.length', 4)
    })

    it('Displays an error on failure', () =>{
        cy.intercept('GET', '/api/todos', { statusCode: 500, Response: {}})
        cy.visit('/')
        cy.get('.todo-list li').should('not.exist');
        cy.get('.error').should('be.visible')
    })
})
