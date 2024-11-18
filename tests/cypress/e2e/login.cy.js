describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000'); // Substitua PORT pela porta correta
  });
  
  
    it('Should display the login form', () => {
      cy.get('form#login-form').should('be.visible');
      cy.get('input#username').should('be.visible');
      cy.get('input#password').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Login');
    });
  
    it('Should show error for invalid credentials', () => {
      cy.get('input#username').type('wronguser');
      cy.get('input#password').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      cy.get('#error-message').should('be.visible').and('contain', 'Invalid credentials');
    });
  
    it('Should display success alert for valid credentials', () => {
      cy.get('input#username').type('admin');
      cy.get('input#password').type('password');
      cy.get('button[type="submit"]').click();
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Login successful!');
      });
    });
  });
  