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

 
  //missing fields test
  it('should display error for missing fields', () => {
    cy.visit(baseUrl);
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    cy.get('#editEnd_time').clear();  // Clear the field to simulate missing input
    cy.get('#updateButton').click();
    cy.get('#editMessage').should('contain', 'All fields are required');
  });
  
  //invalid date and time tests
  it('should display error when start time is after end time', () => {
    cy.visit(baseUrl);
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    cy.get('#editStart_time').clear().type('10:00', { force: true });
    cy.get('#editEnd_time').clear().type('09:00', { force: true }); // End time before start time
    cy.get('#updateButton').click();

    // Verify specific error message
    cy.get('#editMessage').should('contain', 'Start Time cannot be after the End Time.');
});

it('should display error when start time equals end time', () => {
  cy.visit(baseUrl);
  cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
  cy.get('#editStart_time').clear().type('10:00', { force: true });
  cy.get('#editEnd_time').clear().type('10:00', { force: true }); // End time = start time
  cy.get('#updateButton').click();

  // Verify specific error message
  cy.get('#editMessage').should('contain', 'Start Time and End Time cannot be the same.');
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

  beforeEach(() => {
    cy.visit(baseUrl);
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

  it('should display error for missing fields', () => {
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    cy.get('#editEnd_time').clear(); // Clear the field to simulate missing input
    cy.get('#updateButton').click();
    cy.get('#editMessage').should('contain', 'All fields are required');
  });

  it('should display error when start time is after end time', () => {
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    cy.get('#editStart_time').clear().type('10:00', { force: true });
    cy.get('#editEnd_time').clear().type('09:00', { force: true }); // End time before start time
    cy.get('#updateButton').click();
    cy.get('#editMessage').should('contain', 'Start Time cannot be after the End Time.');
  });

  it('should display error when start time equals end time', () => {
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    cy.get('#editStart_time').clear().type('10:00', { force: true });
    cy.get('#editEnd_time').clear().type('10:00', { force: true }); // End time = start time
    cy.get('#updateButton').click();
    cy.get('#editMessage').should('contain', 'Start Time and End Time cannot be the same.');
  });

  it('should display error when unable to edit task', () => {
    // Simulate clicking the edit button
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
  
    // Stub the network request to return invalid JSON
    cy.intercept('PUT', '/edit', {
      statusCode: 200,
      body: 'invalid_json', // Simulate an invalid response format
    });
  
    // Click the update button
    cy.get('#updateButton').click();
  
    // Verify the error message is displayed
    cy.get('#editMessage')
      .should('contain', 'Unable to edit task!')
      .and('have.class', 'text-danger');
  });
  
});
