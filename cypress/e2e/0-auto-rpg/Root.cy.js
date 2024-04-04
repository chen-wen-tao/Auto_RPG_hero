/// <reference types="cypress" />

describe("Main page works properly", () => {
    // Executed before each test
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });

    it("loads basic interface", () => {
      cy.get("h1").should("have.text", "Auto RPG");
  
      const button = cy.get("#root > div > div > button").should("exist");
  
      button.should("have.text", "Start");
    });

    it("loads redirects to login", () => {  
      cy.get("#root > div > div > button").click();

      cy.url().should('include', '/login');
    });
  
  });