/// <reference types="cypress" />

describe("Create page works properly", () => {
    // Executed before each test
    beforeEach(() => {
      cy.visit("http://localhost:5173/create-character");
    });

    it("loads all the components", () => {  
      cy.get('[id="name"]').should("exist");

      cy.get('[id="warrior"]').should("exist");
      cy.get('[id="archor"]').should("exist");
      cy.get('[id="mage"]').should("exist");

      const button = cy.get("#root > div > button").should("exist");
  
      button.should("have.text", "Start");

    });

    it("creates a character properly", () => {  
        cy.get('[id="name"]').type("Jim");
  
        cy.get('[id="warrior"]').check();
  
        cy.get("#root > div > button").click();

        cy.url().should('include', '/game');
      });
  });