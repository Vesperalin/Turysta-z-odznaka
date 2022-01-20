describe("labeled points add e2e tests", () => {
  beforeEach(() => {
    cy.visit("/punkt-opisany");
  });

  it("checks if menu renders correctly", () => {
    cy.get("#buttonContainer").should("exist");
    cy.get(':nth-child(1) > a > .LinkButton_linkText__2AiYn').should('exist');
    cy.get(':nth-child(1) > a > .LinkButton_linkText__2AiYn').should('be.visible');
    cy.get(':nth-child(1) > a > .LinkButton_linkText__2AiYn').should('have.text', 'Dodaj punkt opisany');
    cy.get(':nth-child(2) > a > .LinkButton_linkText__2AiYn').should('exist');
    cy.get(':nth-child(2) > a > .LinkButton_linkText__2AiYn').should('be.visible');
    cy.get(':nth-child(2) > a > .LinkButton_linkText__2AiYn').should('have.text', 'Edytuj punkt opisany');
    cy.get(':nth-child(3) > a > .LinkButton_linkText__2AiYn').should('exist');
    cy.get(':nth-child(3) > a > .LinkButton_linkText__2AiYn').should('be.visible');
    cy.get(':nth-child(3) > a > .LinkButton_linkText__2AiYn').should('have.text', 'Usuń punkt opisany');
    cy.get(':nth-child(4) > a > .LinkButton_linkText__2AiYn').should('exist');
    cy.get(':nth-child(4) > a > .LinkButton_linkText__2AiYn').should('be.visible');
    cy.get(':nth-child(4) > a > .LinkButton_linkText__2AiYn').should('have.text', 'Szukaj punktów opisanych');
  });

  it("allows to fill up the form with incorrect values (not unique name) and try to save", () => {
    cy.wait(1000);
    cy.get(':nth-child(1) > a > .LinkButton_linkText__2AiYn').click();
    cy.url().should("include", "dodaj");
    cy.wait(1000);
    cy.get('#pointNewName').clear();
    cy.get('#pointNewName').type('weTliNa');
    cy.wait(1000);
    cy.get('.Button_button__2iUvQ > p').click();
    cy.get('.AddLabeledPoint_info__3VS4x').should('exist');
    cy.get('.AddLabeledPoint_info__3VS4x').should('be.visible');
    cy.get('.AddLabeledPoint_info__3VS4x').should('have.text', 'Punkt o takiej nazwie już istnieje. Wybierz inną nazwę');
    cy.get('.LinkButton_linkText__2AiYn').should('exist');
    cy.get('.LinkButton_linkText__2AiYn').should('be.visible');
    cy.get('.LinkButton_linkText__2AiYn').should('have.text', 'Zakończ');
    cy.wait(1000);
    cy.get('.LinkButton_linkText__2AiYn').click();
  });

  it("allows to fill up the form with correct values and try to save", () => {
    cy.wait(1000);
    cy.get(':nth-child(1) > a > .LinkButton_linkText__2AiYn').click();
    cy.url().should("include", "dodaj");
    cy.wait(1000);
    cy.get('#pointNewName').clear();
    cy.get('#pointNewName').type('Zielone Berdo');
    cy.get('#pointNewHeight').clear();
    cy.get('#pointNewHeight').type('989');
    cy.wait(1000);
    cy.get('.Button_button__2iUvQ > p').should('exist');
    cy.get('.Button_button__2iUvQ > p').should('be.visible');
    cy.get('.Button_button__2iUvQ > p').should('have.text', 'Dodaj punkt opisany');
    cy.get('.Button_button__2iUvQ > p').click();
    cy.get('.AddLabeledPoint_info__3VS4x').should('exist');
    cy.get('.AddLabeledPoint_info__3VS4x').should('be.visible');
    cy.get('.AddLabeledPoint_info__3VS4x').should('have.text', 'Punkt Zielone Berdo został pomyślnie dodany');
    cy.get('.LinkButton_linkText__2AiYn').should('exist');
    cy.get('.LinkButton_linkText__2AiYn').should('be.visible');
    cy.get('.LinkButton_linkText__2AiYn').should('have.text', 'Zakończ');
    cy.wait(1000);
    cy.get('.LinkButton_linkText__2AiYn').click();
  });
});
