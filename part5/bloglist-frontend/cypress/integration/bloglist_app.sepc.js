describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    };

    const anotherUser = {
      name: 'Jon Snow',
      username: 'jon.snow',
      password: 'knownothing',
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.request('POST', 'http://localhost:3001/api/users', anotherUser);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function(){
    cy.contains('log in to application');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#signin-button').click();

      cy.contains('Matti Luukkainen logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('wrong');
      cy.get('#signin-button').click();

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html')
        .should('not.contain', 'Matti Luukkainen logged in');
    });
  });

  describe('When logged in', function(){
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });

    it('A blog can be created', function() {
      cy.contains('create new blog').click();
      cy.get('#title').type('A new title');
      cy.get('#author').type('A new author');
      cy.get('#url').type('A new url');

      cy.get('#createButton').click();

      cy.contains('A new title');
      cy.contains('A new author');
      cy.contains('A new url');
    });

    describe('and blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'one blog title',
          author: 'one blog author',
          url: 'one blog url',
        });

        cy.createBlog({
          title: 'another blog title',
          author: 'another blog author',
          url: 'another blog url',
        });
      });

      it('its likes can be added', function() {
        cy.contains('another blog title').contains('view').click();
        cy.contains('another blog title').contains('like').click();
      });

      it('its creator can delete it', function() {
        cy.contains('another blog title').contains('view').click();
        cy.contains('another blog title').contains('remove').click();
      });

      it('other use cannot delete it', function() {
        cy.contains('logout').click();

        cy.login({ username: 'jon.snow', password: 'knownothing' });

        cy.contains('another blog title').contains('view').click();

        cy.get('.blogDiv')
          .should('not.contain', 'remove');
      });

      it('blogs are ordered', function() {
        cy.contains('another blog title').contains('view').click();

        cy.contains('another blog title').contains('like').click();

        // a workaround to query the response page
        cy.reload();
        cy.get('.blogDiv')
          .then(($div) => {
            cy.wrap($div).first().should('contain', 'likes 1');
          });
      });
    });
  });
});
