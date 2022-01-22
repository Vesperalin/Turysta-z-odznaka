describe("labeled points add e2e tests", () => {
  beforeEach(() => {
    cy.visit("/tworzenie-trasy");
  });

  it("tour creation test (with non existing first point and non unique tour name at first attempts)", () => {
    cy.url().should("include", "tworzenie-trasy");
    cy.get('h3').should('be.visible');
    cy.get('h3').should('have.text', 'Stwórz trasę poprzez podanie punktów tworzących odcinki');
    cy.get('.TourCreationForm_pointsPresenter__Ok1jq').should('be.visible');
    cy.get('.TourCreationForm_pointsPresenter__Ok1jq').should('have.text', 'Punkty do GOT0');
    cy.get('.Button_button__2iUvQ > p').should('be.visible');
    cy.get('.Button_button__2iUvQ > p').should('have.text', 'Dodaj punkt startowy');
    cy.get('.Button_button__2iUvQ > p').click();
    cy.wait(1000);
    cy.get('.TourCreationForm_errorInfo__2OLe4').should('be.visible');
    cy.get('.TourCreationForm_errorInfo__2OLe4').should('have.text', 'Punkt opisany o nazwie:  nie istnieje');
    cy.get('div > input').clear();
    cy.get('div > input').type('cvbvbcb');
    cy.get('.Button_button__2iUvQ').click();
    cy.wait(1000);
    cy.get('.TourCreationForm_errorInfo__2OLe4').should('be.visible');
    cy.get('.TourCreationForm_errorInfo__2OLe4').should('have.text', 'Punkt opisany o nazwie: cvbvbcb nie istnieje');
    cy.get('div > input').clear();
    cy.get('div > input').type('pol');
    cy.get('[data-user-value="true"]').click();
    cy.wait(1000);
    cy.get('.Button_button__2iUvQ > p').click();
    cy.get('h3').should('be.visible');
    cy.get('h3').should('have.text', 'Stwórz trasę poprzez podanie punktów tworzących odcinki');
    cy.get('.TourCreationForm_formWrapper__Dk6dc').should('be.visible');
    cy.get('.Button_button__2iUvQ').should('be.visible');
    cy.get('.Button_button__2iUvQ > p').should('have.text', 'Zatwierdź trasę');
    cy.get('.TourCreationForm_pointsPresenter__Ok1jq').should('be.visible');
    cy.get('.TourCreationForm_pointsPresenter__Ok1jq').should('have.text', 'Punkty do GOT0');
    cy.get(':nth-child(1) > p').should('be.visible');
    cy.get(':nth-child(1) > p').should('have.text', '+ Dodaj punkt');
    cy.get('.TourCreationForm_buttonsWrapper__vMfQ3 > :nth-child(2) > p').should('be.visible');
    cy.get('.TourCreationForm_buttonsWrapper__vMfQ3 > :nth-child(2) > p').should('have.text', '- Usuń ostatni punkt');
    cy.get('#button--listbox-input--57').click();
    cy.get('#option-6--listbox-input--57').click();
    cy.get(':nth-child(1) > p').click();
    cy.wait(1000);
    cy.get('#button--listbox-input--57').click();
    cy.get(':nth-child(1) > p').click();
    cy.wait(1000);
    cy.get('.TourCreationForm_buttonsWrapper__vMfQ3 > :nth-child(2)').click();
    cy.get('.TourCreationForm_buttonsWrapper__vMfQ3 > :nth-child(2) > p').click();
    cy.get('.TourCreationForm_buttonsWrapper__vMfQ3 > :nth-child(2) > p').click();
    cy.get('div > input').clear();
    cy.get('div > input').type('ho');
    cy.get('[data-suggested-value="true"]').click();
    cy.wait(1000);
    cy.get('.Button_button__2iUvQ > p').click();
    cy.get('.TourCreationForm_formWrapper__Dk6dc').should('be.visible');
    cy.get('.Button_button__2iUvQ > p').click();
    cy.get('.TourCreationForm_errorInfo__2OLe4').should('be.visible');
    cy.get('.TourCreationForm_errorInfo__2OLe4').should('have.text', 'Nie wybrano punktu tworzącego odcinek');
    cy.wait(1000);
    cy.get('#button--listbox-input--159').click();
    cy.get('#option-42--listbox-input--159').click();
    cy.get('.TourCreationForm_buttonsWrapper__vMfQ3 > :nth-child(1)').click();
    cy.get('.TourCreationForm_pointsPresenter__Ok1jq > :nth-child(2)').should('be.visible');
    cy.get('.TourCreationForm_pointsPresenter__Ok1jq > :nth-child(2)').should('have.text', '13');
    cy.wait(1000);
    cy.get('.Button_button__2iUvQ > p').click();
    cy.get('h3').should('be.visible');
    cy.get('h3').should('have.text', 'Nadaj trasie nazwę');
    cy.get('.Button_button__2iUvQ').should('be.visible');
    cy.get('.Button_button__2iUvQ > p').should('have.text', 'Zatwierdź');
    cy.get('.Button_button__2iUvQ').click();
    cy.get('.TourCreationNameForm_errorInfo__zWjl2').should('be.visible');
    cy.get('.TourCreationNameForm_errorInfo__zWjl2').should('have.text', 'Nie podano nazwy trasy');
    cy.get('#tourName').click();
    cy.wait(1000);
    cy.get('#tourName').clear();
    cy.get('#tourName').type('Bieszczady 2022');
    cy.get('.Button_button__2iUvQ').click();
    cy.get('.TourCreationNameForm_errorInfo__zWjl2').should('be.visible');
    cy.get('.TourCreationNameForm_errorInfo__zWjl2').should('have.text', 'Trasa o wybranej nazwie już istnieje. Wybierz inną nazwę');
    cy.wait(1000);
    cy.get('#tourName').clear();
    cy.get('#tourName').type('Bieszczady z rodziną 2022');
    cy.get('.Button_button__2iUvQ').click();
    cy.wait(1000);
    cy.get('.TourCreation_resultInfo__2XMSM').should('be.visible');
    cy.get('.TourCreation_resultInfo__2XMSM').should('have.text', 'Zapisano trasę: Bieszczady z rodziną 2022');
    cy.get('.TourCreation_points__1LkhL').should('be.visible');
    cy.get('.TourCreation_points__1LkhL').should('have.text', 'Liczba punktów do GOT: 13');
    cy.get('tbody > tr > :nth-child(1)').should('be.visible');
    cy.get('tbody > tr > :nth-child(1)').should('have.text', '1');
    cy.get('tbody > tr > :nth-child(2)').should('be.visible');
    cy.get('tbody > tr > :nth-child(2)').should('have.text', 'Hotel PTTK Ustrzyki Górne');
    cy.get('tbody > tr > :nth-child(3)').should('be.visible');
    cy.get('tbody > tr > :nth-child(3)').should('have.text', '-');
    cy.get('tbody > tr > :nth-child(4)').should('be.visible');
    cy.get('tbody > tr > :nth-child(4)').should('have.text', 'Szeroki Wierch');
    cy.get('tbody > tr > :nth-child(5)').should('be.visible');
    cy.get('tbody > tr > :nth-child(5)').should('have.text', 'Bieszczady');
    cy.get('tbody > tr > :nth-child(6)').should('be.visible');
    cy.get('tbody > tr > :nth-child(6)').should('have.text', '13');
    cy.get('.LinkButton_linkText__2AiYn').should('be.visible');
    cy.get('.LinkButton_linkText__2AiYn').should('have.text', 'Zakończ');
    cy.wait(1000);
    cy.get('.LinkButton_linkText__2AiYn').click();
  });
});
