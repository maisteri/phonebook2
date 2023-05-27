describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ username: 'root', name: 'Root User', password: 'password' })
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.contains('login').click()
      cy.contains('Root User logged in')
      cy.contains('Nice to see you again Root User!')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('xroot')
      cy.get('#password').type('password')
      cy.contains('login').click()
      cy.contains('Root User logged in').should('not.exist')
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.contains('create new')
      cy.get('#title').type('This is a cypress test title')
      cy.get('#author').type('Cypress Test')
      cy.get('#url').type('cypress.test')
      cy.get('#createButton').click()
      cy.contains('a new blog This is a cypress test title by Cypress Test added!')
      cy.contains('This is a cypress test title, Cypress Test')
      cy.visit('http://localhost:3003')
      cy.contains('This is a cypress test title, Cypress Test')
    })

    describe('When many blogs are created', function() {
      beforeEach(function() {
        const blogList = [
          {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7
          },
          {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
          },
          {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
          },
          {
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10
          },
          {
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
          },
          {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2
          }
        ]
        blogList.forEach(blog => cy.createBlog(blog))
        cy.visit('http://localhost:3003')
      })

      it('blogs are in order by amount of likes', function() {
        cy.contains('TDD harms architecture')
        cy.get('.blog').eq(0).should('contain', 'Canonical string reduction')
        cy.get('.blog').eq(1).should('contain', 'First class tests')
        cy.get('.blog').eq(2).should('contain', 'React patterns')
        cy.get('.blog').eq(3).should('contain', 'Go To Statement Considered Harmful')
        cy.get('.blog').eq(4).should('contain', 'Type wars')
        cy.get('.blog').eq(5).should('contain', 'TDD harms architecture')
      })


    })

    describe('When blog created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'This is a cypress test title',
          author: 'Cypress Test',
          url: 'cypress.test'
        })
        cy.visit('http://localhost:3003')
      })

      it('A blog can be liked', function() {
        cy.get('#blogInfoButton').click()
        cy.contains('likes 0')
        cy.get('#likeButton').click()
        cy.contains('likes 1')
        cy.get('#likeButton').click()
        cy.visit('http://localhost:3003')
        cy.get('#blogInfoButton').click()
        cy.contains('likes 2')
      })

      it('A blog can be deleted', function() {
        cy.get('#blogInfoButton').click()
        cy.get('.btn-delete').click()
        cy.contains('deleted a blog This is a cypress test title by Cypress Test!')
        cy.contains('This is a cypress test title, Cypress Test').should('not.exist')
        cy.visit('http://localhost:3003')
        cy.contains('Root User logged in')
        cy.contains('This is a cypress test title, Cypress Test').should('not.exist')
      })

      describe('When logged in as another user', function() {
        beforeEach(function() {
          cy.contains('Logout').click()
          cy.createUser({ username: 'another', name: 'Another User', password: 'password' })
          cy.login({ username: 'another', password: 'password' })
        })

        it('Only blog creator sees the delete button', function() {
          cy.get('#blogInfoButton').click()
          cy.get('.btn-delete').should('have.css', 'display', 'none')
        })
      })

    })

  })
})