describe('The Home Page and Project Creation', () => {
    it('successfully logs in and navigates to the Projects page', () => {
      cy.visit('http://localhost:5173'); // Acessa a página inicial
      cy.contains('Sign In').click(); // Clica no botão "Sign In"
      cy.url().should('include', '/signin'); // Verifica se a URL contém '/signin'
      cy.get('#email').type('rayssa_goulart'); // Preenche o campo de email
      cy.get('#password').type('123'); // Preenche o campo de senha
      cy.get('[data-cy=botao-login]').click(); // Clica no botão de login
  
      // Verifica se foi redirecionado para '/backlog'
      cy.url().should('include', '/backlog'); // Garante que está na página backlog
  
      // Navega para a página de projetos
      cy.visit('http://localhost:5173/projects'); // Acessa diretamente a página de projetos
      cy.url().should('include', '/projects'); // Verifica se está na página correta
  
      // Testa se a página de projetos carrega corretamente
      cy.get('[data-cy="main-project-title"]').should("be.visible"); // Verifica o título principal da página
      cy.get("table").should("be.visible"); // Verifica se a tabela de projetos está visível
      cy.get("thead").should("contain", "Name"); // Verifica se a coluna de 'Name' está presente
      cy.get("thead").should("contain", "Description"); // Verifica se a coluna de 'Description' está presente
      cy.get("thead").should("contain", "Owner"); // Verifica se a coluna de 'Owner' está presente
      cy.get("thead").should("contain", "Actions"); // Verifica se a coluna de 'Actions' está presente
  
      // Testa o clique no botão "Create Project"
      cy.contains("Create Project").click(); // Clica no botão para criar um projeto
      cy.get("form").should("be.visible"); // Verifica se o formulário de criação de projeto aparece
    });
  });