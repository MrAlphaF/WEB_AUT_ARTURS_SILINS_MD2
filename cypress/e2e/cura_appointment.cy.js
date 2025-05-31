// cypress/e2e/cura_appointment.cy.js

describe('CURA Healthcare Service Scenarios', () => {
  beforeEach(() => {
    cy.visit('https://katalon-demo-cura.herokuapp.com/');
  });

  it('should successfully book an appointment and validate the details', () => {
    cy.get('#btn-make-appointment').click();
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword');
    cy.get('#btn-login').click();
    cy.get('#combo_facility').select('Seoul CURA Healthcare Center');
    cy.get('#chk_hospotal_readmission').check();
    cy.get('#radio_program_medicaid').check();
    cy.get('#txt_visit_date').click();
    cy.get('.datepicker-days .day:not(.old):not(.new)').contains('30').click();
    cy.get('body').click();
    cy.get('#txt_comment').type('CURA Healthcare Service');
    cy.get('#btn-book-appointment').click();

    cy.get('#facility').should('have.text', 'Seoul CURA Healthcare Center');
    cy.get('#hospital_readmission').should('have.text', 'Yes');
    cy.get('#program').should('have.text', 'Medicaid');

    const day = "30";
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const expectedDateString = `${day}/${month}/${year}`;
    cy.get('#visit_date').should('have.text', expectedDateString);

    cy.get('#comment').should('have.text', 'CURA Healthcare Service');
  });

  it('should log in and verify that appointment history is empty', () => {
    cy.get('#btn-make-appointment').click();
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword');
    cy.get('#btn-login').click();
    cy.get('#menu-toggle').click();
    cy.get('#sidebar-wrapper').should('have.class', 'active');
    cy.get('#sidebar-wrapper li a[href="history.php#history"]').click();
    cy.get('#history .col-sm-12.text-center p').should('contain.text', 'No appointment');
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});