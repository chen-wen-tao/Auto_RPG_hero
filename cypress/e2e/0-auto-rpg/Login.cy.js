/// <reference types="cypress" />

describe("Login page works properly", () => {
    // Executed before each test

    it("redirects correctly", () => {  
        cy.visit("http://localhost:5173/login");

        cy.url().should('include', '/create-character');

    });
  });