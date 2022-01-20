describe("labeled points update e2e tests", () => {
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

  it("tries to edit point that doesn't exist", () => {
    cy.wait(1000);
    cy.get(':nth-child(2) > a > .LinkButton_linkText__2AiYn').click();
    cy.url().should("include", "edytuj");
    cy.wait(1000);
    cy.get('div > input').clear();
    cy.get('div > input').type('hdfhd');
    cy.wait(1000);
    cy.get('span').should('have.text', 'Nie znaleziono dopasowania');
    cy.get('.Button_button__2iUvQ').should('exist');
    cy.get('.Button_button__2iUvQ').should('be.visible');
    cy.get('.Button_button__2iUvQ').should('have.text', 'Edytuj punkt opisany');
    cy.get('.Button_button__2iUvQ').click();
    cy.wait(1000);
    cy.get('.EditLabeledPoint_info__3S-tF').should('exist');
    cy.get('.EditLabeledPoint_info__3S-tF').should('be.visible');
    cy.get('.EditLabeledPoint_info__3S-tF').should('have.text', 'Punkt opisany o nazwie: hdfhd nie istnieje');
    cy.get('.LinkButton_linkText__2AiYn').should('exist');
    cy.get('.LinkButton_linkText__2AiYn').should('be.visible');
    cy.get('.LinkButton_linkText__2AiYn').should('have.text', 'Zakończ');
    cy.wait(1000);
    cy.get('.LinkButton_linkText__2AiYn').click();
  });

  it("tries to edit point that is used in segments - point chosen from list", () => {
    cy.wait(1000);
    cy.get(':nth-child(2) > a > .LinkButton_linkText__2AiYn').click();
    cy.url().should("include", "edytuj");
    cy.wait(1000);
    cy.get('div > input').clear();
    cy.get('div > input').type('wet');
    cy.get('#-\\31 389563850 > [data-user-value="true"]').click();
    cy.get('.Button_button__2iUvQ > p').should('exist');
    cy.get('.Button_button__2iUvQ > p').should('be.visible');
    cy.get('.Button_button__2iUvQ > p').should('have.text', 'Edytuj punkt opisany');
    cy.get('.Button_button__2iUvQ > p').click();
    cy.wait(1000);
    cy.get('.EditLabeledPoint_info__3S-tF').should('exist');
    cy.get('.EditLabeledPoint_info__3S-tF').should('be.visible');
    cy.get('.EditLabeledPoint_info__3S-tF').should('have.text', 'Punkt Wetlina jest już używany i nie można go edytować');
    cy.get('.LinkButton_linkText__2AiYn').should('exist');
    cy.get('.LinkButton_linkText__2AiYn').should('be.visible');
    cy.get('.LinkButton_linkText__2AiYn').should('have.text', 'Zakończ');
    cy.wait(1000);
    cy.get('.LinkButton_linkText__2AiYn').click();
  });

  it("tries to edit point and give it an existing name - point not chosen from list", () => {
    cy.wait(1000);
    cy.get(':nth-child(2) > a > .LinkButton_linkText__2AiYn').click();
    cy.url().should("include", "edytuj");
    cy.wait(1000);
    cy.get('div > input').clear();
    cy.get('div > input').type('kozi wierch');
    cy.get('.Button_button__2iUvQ').should('be.visible');
    cy.get('.Button_button__2iUvQ').should('have.text', 'Edytuj punkt opisany');
    cy.wait(1000);
    cy.get('.Button_button__2iUvQ > p').click();
    cy.get('.LabeledPointForm_formWrapper__AaAYY > h2').should('have.text', 'Edycja punktu opisanego: kozi wierch');
    cy.get('#pointNewName').should('have.value', 'kozi wierch');
    cy.get('#pointNewHeight').should('have.value', '2291');
    cy.wait(1000);
    cy.get('#pointNewName').clear();
    cy.get('#pointNewName').type('wetlina');
    cy.wait(1000);
    cy.get('.Button_button__2iUvQ').click();
    cy.wait(1000);
    cy.get('.EditionManager_info__1RFmE').should('be.visible');
    cy.get('.EditionManager_info__1RFmE').should('have.text', 'Punkt o takiej nazwie już istnieje. Wybierz inną nazwę');
    cy.get('.LinkButton_linkText__2AiYn').should('be.visible');
    cy.get('.LinkButton_linkText__2AiYn').should('have.text', 'Zakończ');
    cy.wait(1000);
    cy.get('.LinkButton_linkText__2AiYn').click();
  });

  
});
