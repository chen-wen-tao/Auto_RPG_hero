/// <reference types="cypress" />

describe("Create page works properly", () => {
    // Executed before each test
    beforeEach(() => {
      cy.visit("http://localhost:5173/game");
    });

    it("loads all the components", () => {  
        cy.get('[id="character-health-bar"]').should("exist");
        cy.get('[id="enemy-health-bar"]').should("exist");

        cy.get('*[class^="character"]').should("exist");
        cy.get('*[class^="enemy"]').should("exist");
        cy.get('*[class^="item"]').should("exist");
        cy.get('*[class^="bag"]').should("exist");
        cy.get('*[class^="fight"]').should("exist");


        cy.get('*[class^="bag"]').find("button").should("exist");
        cy.get('*[class^="fight"]').find("button").should("exist");

    });


    it("fights properly", () => {
        cy.get('*[class^="enemy"]').then(function($value) {
            let tmp = $value.text();
            let weapon = tmp.split(" ").at(-3).split("\n")[0];
            let armor = tmp.split(" ").at(-1).split("\n")[0];
            const fight = cy.get('*[class^="fight"]').find("button");
            cy.log(tmp);
            fight.click();
            cy.on ('window:alert', (text) => {
                expect(text).to.eq('You Win!!!!')   
            })

          

            cy.log(weapon);
            cy.log(armor);
            cy.get('*[class^="character"]').contains(weapon);
            cy.get('*[class^="character"]').contains(armor);
        });
    });


    // it("changes gears properly", () => {

    //     cy.get('*[class^="enemy"]').then(function($value) {
    //         let tmp = $value.text();
    //         let weapon = tmp.split(" ").at(-3).split("\n")[0];
    //         let armor = tmp.split(" ").at(-1).split("\n")[0];
            
    //         cy.log(tmp);
    //         cy.get('*[class^="fight"]').find("button").click();

    //         let weapon_name = weapon.split(":")[0];
    //         cy.log(weapon_name)
    //         cy.get("#root > div > div > input").type("haah");

    //         cy.get('*[class^="bag"]').find("button").click();
    //     });

        
    // });
  });