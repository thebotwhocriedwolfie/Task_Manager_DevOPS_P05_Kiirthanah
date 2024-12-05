/*describe('Task Manager Frontend', () => {
  let baseUrl;
  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; // Store the base URL
      cy.visit(baseUrl);
    });
  });
  after(() => {
    return cy.task('stopServer'); // Stop the server after the report is done
  });
  it('should update an existing resource', () => {
    cy.visit(baseUrl);
    // Click the edit button for the resource
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    // // Update resource details
    cy.get('#editName').clear().type('Updated Task', { force: true });
    cy.get('#editDescription').clear().type('Updated Description', { force: true });
    cy.get('#editCategoryDropdown').clear().select('Revision', { force: true });
    cy.get('#editStart_time').clear().type('10:00', { force: true });
    cy.get('#editEnd_time').clear().type('12:00', { force: true });
    cy.get('#editTimestamp').clear().type('2026-12-05', { force: true });
    // Click the update resource button
    cy.get('#updateButton').click();
    // Verify the resource is updated in the table
    cy.get('#tableContent').contains('Updated Resource').should('exist');
    cy.get('#tableContent').contains('Test Resource').should('not.exist');
    });


});*/

describe('Task Manager Frontend', () => {
  let baseUrl;

  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; // Store the base URL
      cy.visit(baseUrl);
    });
  });

  after(() => {
    return cy.task('stopServer'); // Stop the server after the report is done
  });

  it('should update an existing resource', () => {
    cy.visit(baseUrl);
    // Click the edit button for the resource
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    // Update resource details
    cy.get('#editName').clear().type('Updated Task', { force: true });
    cy.get('#editDescription').clear().type('Updated Description', { force: true });
    cy.get('#editCategoryDropdown').select('Revision', { force: true });
    cy.get('#editStart_time').clear().type('10:00', { force: true });
    cy.get('#editEnd_time').clear().type('12:00', { force: true });
    cy.get('#editTimestamp').clear().type('2026-12-05', { force: true });
    // Click the update resource button
    cy.get('#updateButton').click();
    // Verify the resource is updated in the table
    cy.get('#tableContent').contains('Updated Task').should('exist');
  });

  it('should display error for non-existent task', () => {
    // Simulate editing a non-existent task
    cy.visit(`${baseUrl}/tasks/non-existent-id/edit`);
    cy.get('#updateButton').click();
    cy.visit('/tasks/non-existent-id/edit', { failOnStatusCode: false });
    // Verify error message
    cy.get('.error-message').should('contain', 'Task not found with provided ID');
  });

  it('should display error for missing fields', () => {
    cy.visit(baseUrl);
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    cy.get('#editEnd_time').clear();  // Clear the field to simulate missing input
    cy.get('#updateButton').click();
    cy.get('.error-message').should('contain', 'Fields cannot be empty');
  });

  it('should display error for duplicate task name', () => {
    cy.visit(baseUrl);
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    cy.get('#editName').clear().type('AMDT Project', { force: true }); // duplicate name
    cy.get('#updateButton').click();
    // Verify error message
    cy.get('.error-message').should('contain', 'Task name should be unique');
    cy.get('#taskName').clear().type('Duplicate Task Name');
    cy.get('#updateButton').click();
    cy.get('.error-message').should('contain', 'Task name already exists');

  });

  it('should display error for invalid time input', () => {
    cy.visit(baseUrl);
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    cy.get('#editStart_time').clear().type('10:00', { force: true });
    cy.get('#editEnd_time').clear().type('09:00', { force: true }); // End time before start time
    cy.get('#updateButton').click();
    cy.get('#timeInput').clear().type('invalid-time');
    cy.get('#updateButton').click();

    // Verify error message
    cy.get('.error-message').should('contain', 'Validation failed');
  });

  it('should display error for unexpected backend issues', () => {
    // Mock a server error for testing
    cy.intercept('PUT', `${baseUrl}/tasks/*`, {
      statusCode: 500,
      body: { message: 'Unexpected error' },
    }).as('putRequest');
  
    cy.visit(baseUrl);
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    cy.get('#editName').clear().type('Simulated Error Task', { force: true });
  
    // Click the update button
    cy.get('#updateButton').click();
  
    // Wait for the intercepted request to ensure it's captured
    cy.wait('@putRequest');
  
    // Verify the error message for backend issues
    cy.get('#editMessage')  // Assuming the error message is inside an element with this ID
      .should('be.visible')
      .and('have.text', 'Unexpected error');  // Verify the error text
    cy.get('#editMessage')  // Optionally check if the error message has the 'text-danger' class
      .should('have.class', 'text-danger');
  });
  

});
