describe("renders own points page", () => {
  beforeEach(() => {
    cy.visit("/zglaszanie-dowodow");
  });

  it("renders correctly", () => {
    cy.get(".SearchForm_formWrapper__2KzEW > h2").should(
      "have.text",
      "Wybierz trasę do weryfikacji"
    );
    cy.get("div > input").should("exist");
    cy.get(".Button_button__2HkXA").should("exist");
    cy.get(".Button_button__2HkXA > p").should("have.text", "Szukaj trasy");
  });

  it("routes to tour segments list", () => {
    cy.get(".SearchForm_formWrapper__2KzEW > h2").should(
      "have.text",
      "Wybierz trasę do weryfikacji"
    );
    cy.get("div > input").should("exist");
    cy.get(".Button_button__2HkXA").should("exist");
    cy.get(".Button_button__2HkXA > p").should("have.text", "Szukaj trasy");
    cy.get("div > input").clear();
    cy.get("div > input").type("Moja");
    cy.get('#\\35 34561089 > [data-suggested-value="true"]').click();
    cy.get(".Button_button__2HkXA > p").click();
    cy.get(".EvidenceConfirmationSegmentsList_tableTitle__1fLfQ").should(
      "have.text",
      "Moja pierwsza trasa"
    );
    cy.get(".EvidenceConfirmationManager_info__L3l4i").should(
      "have.text",
      "Wybierz odcinki do weryfikacji"
    );
    cy.get("#segmentsList").should("exist");
    cy.get("tbody > :nth-child(1) > :nth-child(1)").should(
      "have.text",
      "Schronisko PTTK Hala Szrenicka"
    );
    cy.get("tbody > :nth-child(2) > :nth-child(1)").should(
      "have.text",
      "Wodospad Kamieńczyk"
    );
    cy.get("tbody > :nth-child(3) > :nth-child(1)").should(
      "have.text",
      "Schronisko PTTK Hala Szrenicka"
    );
    cy.get("tbody > :nth-child(4) > :nth-child(1)").should(
      "have.text",
      "Szrenica"
    );
    cy.get("tbody > :nth-child(5) > :nth-child(1)").should(
      "have.text",
      "Przełęcz Mokra"
    );
    cy.get("tbody > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "Wodospad Kamieńczyk"
    );
    cy.get("tbody > :nth-child(2) > :nth-child(2)").should(
      "have.text",
      "Schronisko PTTK Hala Szrenicka"
    );
    cy.get("tbody > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      "Szrenica"
    );
    cy.get("tbody > :nth-child(4) > :nth-child(2)").should(
      "have.text",
      "Przełęcz Mokra"
    );
    cy.get("tbody > :nth-child(5) > :nth-child(2)").should(
      "have.text",
      "Śnieżne Kotły"
    );
    cy.get(
      ".EvidenceConfirmationManager_wrapper__2QO4R > :nth-child(3)"
    ).should("exist");
  });

  it("routes to data forms and let user fill that forms and pick tour segments", () => {
    cy.get(".SearchForm_formWrapper__2KzEW > h2").should(
      "have.text",
      "Wybierz trasę do weryfikacji"
    );
    cy.get("div > input").should("exist");
    cy.get(".Button_button__2HkXA").should("exist");
    cy.get(".Button_button__2HkXA > p").should("have.text", "Szukaj trasy");
    cy.get("div > input").clear();
    cy.get("div > input").type("Moja");
    cy.get('#\\35 34561089 > [data-suggested-value="true"]').click();
    cy.get(".Button_button__2HkXA > p").click();
    cy.get('tbody > :nth-child(1) > :nth-child(1)').click();
    cy.get('tbody > :nth-child(2) > :nth-child(1)').click();
    cy.get('.EvidenceConfirmationManager_wrapper__2QO4R > :nth-child(3)').click();
    cy.get(':nth-child(2) > :nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').should('be.visible');
    cy.get(':nth-child(2) > :nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').should('be.visible');
    cy.get(':nth-child(3) > :nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').should('be.visible');
    cy.get(':nth-child(3) > :nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').should('be.visible');
    cy.get(':nth-child(2) > :nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').click();
    cy.get('.react-datepicker__day--012').click();
    cy.get(':nth-child(2) > :nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').click();
    cy.get('.react-datepicker__day--013').click();
    cy.get(':nth-child(3) > :nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').click();
    cy.get('.react-datepicker__day--013').click();
    cy.get(':nth-child(3) > :nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').click();
    cy.get('.react-datepicker__day--013').click();
    cy.get('.Button_button__2HkXA').click();
    cy.get(':nth-child(2) > :nth-child(1) > p').should('be.visible');
    cy.get('.EvidenceConfirmationManager_wrapper__2QO4R > :nth-child(2) > :nth-child(2)').should('be.visible');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').should('have.css', 'background-color')//.and('eq', 'rgba(197, 221, 73, 0.25)');
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should('have.css', 'background-color')//.and('eq', 'rgba(197, 221, 73, 0.25)');
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.css', 'background-color')//.and('eq', 'rgba(197, 221, 73, 0.25)');
    cy.get('tbody > :nth-child(2) > :nth-child(4)').should('have.css', 'background-color')//.and('eq', 'rgba(197, 221, 73, 0.25)');
    cy.get('tbody > :nth-child(1) > :nth-child(1)').should('have.css', 'background-color')//.and('eq', 'rgba(197, 221, 73, 0.25)');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should('have.css', 'background-color')//.and('eq', 'rgba(197, 221, 73, 0.25)');
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.css', 'background-color')//.and('eq', 'rgba(197, 221, 73, 0.25)');
    cy.get('tbody > :nth-child(1) > :nth-child(4)').should('have.css', 'background-color')//.and('eq', 'rgba(197, 221, 73, 0.25)');
  });

  it("routes to guide form and shows error message", () => {
    cy.get(".SearchForm_formWrapper__2KzEW > h2").should(
      "have.text",
      "Wybierz trasę do weryfikacji"
    );
    cy.get("div > input").should("exist");
    cy.get(".Button_button__2HkXA").should("exist");
    cy.get(".Button_button__2HkXA > p").should("have.text", "Szukaj trasy");
    cy.get("div > input").clear();
    cy.get("div > input").type("Moja");
    cy.get('#\\35 34561089 > [data-suggested-value="true"]').click();
    cy.get(".Button_button__2HkXA > p").click();
    cy.get('tbody > :nth-child(1) > :nth-child(1)').click();
    cy.get('tbody > :nth-child(2) > :nth-child(1)').click();
    cy.get('.EvidenceConfirmationManager_wrapper__2QO4R > :nth-child(3)').click();
    cy.get(':nth-child(2) > :nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').click();
    cy.get('.react-datepicker__day--012').click();
    cy.get(':nth-child(2) > :nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').click();
    cy.get('.react-datepicker__day--013').click();
    cy.get(':nth-child(3) > :nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').click();
    cy.get('.react-datepicker__day--013').click();
    cy.get(':nth-child(3) > :nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .EvidenceConfirmationDateForm_input__2UQDx').click();
    cy.get('.react-datepicker__day--013').click();
    cy.get('.Button_button__2HkXA').click();
    cy.get(':nth-child(2) > :nth-child(2) > p').click();
    cy.get('.EvidenceConfirmationEvidenceForm_formWrapper__13cPt > h2').should('have.text', 'Wpisz dane przewodnika odbywającego z Tobą trasę');
    cy.get('#evidence').should('have.id', 'evidence');
    cy.get('#evidence').clear();
    cy.get('#evidence').type('654321');
    cy.get('.Button_button__2HkXA').click();
    cy.get('.EvidenceConfirmationEvidenceForm_errorInfo__3rPO8').should('be.visible');
    cy.get('.EvidenceConfirmationEvidenceForm_errorInfo__3rPO8').should('have.text', 'Przewodnik o podanym numerze legitymacji nie istnieje');
  });
});
