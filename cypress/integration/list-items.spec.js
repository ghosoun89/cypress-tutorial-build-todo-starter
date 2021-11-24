describe('List items', () =>{
    beforeEach(() => {
        cy.seedAndVisit();
    })

    it('Properly displays completed items', () =>{
        cy.get('.todo-list li')
        .filter('.completed').should('have.length', 1).and('contain', 'Eggs')
        .find('.toggle').should('be.checked');
    })

    it('Shows remaining todos in the footer', () =>{
        cy.get('.todo-count').should('contain', 3);
    })

    it('Removes a todo', () =>{
        cy.intercept('DELETE','/api/todos/1',{statusCode: 200, Response: {}});
        cy.get('.todo-list li').as('list');
        cy.get('@list').first().find('.destroy').invoke('show').click();
        cy.get('@list').should('have.length', 3).and('not.contain', 'Milk');

    })

    it('Marks an incomplete item complete', () =>{
        cy.fixture('todos').then((todos) =>{
            cy.log(todos)
            const target = Cypress._.head(todos);
            const obj  = Cypress._.merge(target,{isComplete: true})
            cy.log(obj)
            cy.log(target)
            cy.intercept('PUT', `/api/todos/${target.id}`, obj)
        })
       cy.get('.todo-list li').first().as('first-todo');
       cy.get('@first-todo').find('.toggle').click({force: true}).should('be.checked');
       cy.get('@first-todo').should('have.class', 'completed');
       cy.get('.todo-count').should('contain', 2);

    })
})