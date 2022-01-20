describe("renders own points page", () => {
  beforeEach(() => {
    cy.visit("/punkt-wlasny");
  });

  it("renders correctly", () => {
    cy.get("#buttonContainer").should("exist");
    cy.get(":nth-child(1) > a > .LinkButton_linkText__IcY_S").should("exist");
  });

  it("routes to add point form", () => {
    cy.get(":nth-child(1) > a > .LinkButton_linkText__IcY_S").click();
    cy.url().should("include", "dodaj");
  });

  it("allows to fill up the form with correct values and save", () => {
    cy.get(":nth-child(1) > a > .LinkButton_linkText__IcY_S").click();
    cy.url().should("include", "dodaj");
    cy.get("#pointNewName").clear();
    cy.get("#pointNewName").type("Nowy punkt własny");
    cy.get("#pointNewLatitude").clear();
    cy.get("#pointNewLatitude").type("45.6756");
    cy.get("#pointNewLongitude").clear();
    cy.get("#pointNewLongitude").type("43.4342");
    cy.get(".Button_button__2HkXA").click();
    cy.get('.AddOwnPoint_info__RMMLk').should('have.text', 'Punkt Nowy punkt własny został pomyślnie dodany');
    cy.get('.LinkButton_linkText__IcY_S').should('be.visible');
  });

  it("allows to fill up the form with incorrect values (not unique name) and save", () => {
    cy.get(":nth-child(1) > a > .LinkButton_linkText__IcY_S").click();
    cy.url().should("include", "dodaj");
    cy.get("#pointNewName").clear();
    cy.get("#pointNewName").type("Łysica");
    cy.get("#pointNewLatitude").clear();
    cy.get("#pointNewLatitude").type("45.6756");
    cy.get("#pointNewLongitude").clear();
    cy.get("#pointNewLongitude").type("43.4342");
    cy.get(".Button_button__2HkXA").click();
    cy.get('.AddOwnPoint_info__RMMLk').should('have.text', 'Punkt o takiej nazwie już istnieje. Wybierz inną nazwę');
    cy.get('.LinkButton_linkText__IcY_S').should('be.visible');
  });

  it("checks and print error messages while filling up the form", () => {
    cy.get(":nth-child(1) > a > .LinkButton_linkText__IcY_S").click();
    cy.url().should("include", "dodaj");
    cy.get('#pointNewName').clear();
    cy.get('#pointNewName').type('Jakaś nazwa');
    cy.get('.Button_button__2HkXA > p').click();
    cy.get('.OwnPointForm_errorInfo__1PB9a').should('have.text', 'Nie podano szerokości geograficznej punktu własnego');
    cy.get('#pointNewLatitude').clear();
    cy.get('#pointNewLatitude').type('12.3456');
    cy.get('.Button_button__2HkXA').click();
    cy.get('.OwnPointForm_errorInfo__1PB9a').should('have.text', 'Nie podano długości geograficznej punktu własnego');
    cy.get('#pointNewLongitude').clear();
    cy.get('#pointNewLongitude').type('45.5784');
    cy.get('.Button_button__2HkXA > p').click();
    cy.get('.AddOwnPoint_info__RMMLk').should('have.text', 'Punkt Jakaś nazwa został pomyślnie dodany');
    cy.get('.LinkButton_linkText__IcY_S').should('be.visible');
  });
});
