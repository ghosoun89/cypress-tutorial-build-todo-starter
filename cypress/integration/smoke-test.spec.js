describe("The application loads", () => {
  beforeEach(() => {
    cy.seedAndVisit()
  });

  it("has the basic Todo list container", () => {
    cy.get(".todo-list").should("exist");
  });

  it("focuses input on load", () => {
    cy.focused().should('have.class', 'new-todo');
  });

  it("focuses input on load", () => {

    cy.get('.new-todo').type('Buy Milk').should('have.value', 'Buy Milk');
  });
});

describe('Form submission', () => {
  it('Add a new todo on submit', () => {
    const itemText = "Buy eggs";
    cy.stubAndVisit([]);
    cy.get('.new-todo').type(itemText).type('{enter}').should('have.value', '')
    cy.get('.todo-list li').should('have.length', 1)
      .and('contain', itemText);
  })

  it('Show an error message on a failed submission', () => {
    cy.stubAndVisit([]);
    cy.intercept('POST', '/api/todos', {
      statusCode: 500,
      Response: {}
    })
      cy.visit('/')
    cy.get('.new-todo').type('test{enter}');
    cy.get('.todo-list li').should('not.exist');
    cy.get('.error').should('be.visible')
  })
})
