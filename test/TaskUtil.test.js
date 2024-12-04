const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs').promises;
const expect = chai.expect;

const { describe, it } = require('mocha');
//const { expect } = require('chai');
const { server } = require('../index'); 


chai.use(chaiHttp);
let baseUrl;

describe('Edit Task API Tests', () => {
    before((done) => {
        const { address, port } = server.address();
        baseUrl = `http://${address === '::' ? 'localhost' : address}:${port}`;
        done();
    });

    after((done) => {
        server.close(() => done());
    });
    // Test for successful task modification
    it('should modify an existing task successfully', async () => {
        const updateData = {
            name: 'Updated Name',
            description: 'Updated description',
            category: 'Revision',
            start_time: '12:00',
            end_time: '15:00',
            timestamp: '2026-12-10',
        };

        // Make a request
        const response = await chai
            .request(baseUrl)
            .put('/tasks/1731270215089046') 
            .send(updateData);

        // Assertions
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Task modified successfully');
    });

    // Test for non-existent task
    it('should return 404 if the task does not exist', async () => {
        const updatedData = {
            name: 'Updated Task',
            description: 'Updated task',
            category: 'Coding',
            start_time: '10:00',
            end_time: '12:00',
            timestamp: '2026-12-10',
        };

        const response = await chai
            .request(baseUrl)
            .put('/tasks/non-existent-id')
            .send(updatedData);

        // Assertions
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Task not found with provided ID');
    });
    // test for missing fields
    it('should return 400 for a missing field', async () => {
        const missingData = {
            name: 'Missing Task',
            description: 'Missing task',
            category: 'Coding',
            start_time: '10:00',
            end_time: '',
            timestamp: '2026-12-10',
        };

        const response = await chai
            .request(baseUrl)
            .put('/tasks/1733050328674375')
            .send(missingData);

       
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Missing required fields');
    });
    //test for duplicate name
    it('should return 400 for duplicate name input', async () => {
        const duplicateData = {
            name: 'AMDT Project',
            description: 'Updated Description',
            category: 'Coding',
            start_time: '10:00',
            end_time: '12:00',
            timestamp: '2026-12-10',
        };
        
        const response = await chai
            .request(baseUrl)
            .put('/tasks/1733050328674377')
            .send(duplicateData);

        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Task name should be unique');
    });


    //test for invalid date and or time input
    it('should return 400 for a invalid input', async () => {
        const invalidData = {
            name: 'Updated Task',
            description: 'Updated Description',
            category: 'Coding',
            start_time: '10:00',
            end_time: '09:00',
            timestamp: '2024-01-10',
        };
        
        const response = await chai
            .request(baseUrl)
            .put('/tasks/1733050328674375')
            .send(invalidData);

       
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Validation failed');
    });

    // test for unexpected errors
    it('should return 500 if an unexpected error occurs', async () => {
        // Simulate error by mocking the file system
        const originalReadFile = fs.readFile;
        fs.readFile = () => {
            throw new Error('Simulated file system error');
        };

        const updatedData = {
            name: 'Updated Task',
            description: 'Updated Description',
            category: 'Coding',
            start_time: '10:00',
            end_time: '12:00',
            timestamp: '2026-12-10',
        };

        const response = await chai
            .request(baseUrl)
            .put('/tasks/1731270215089046') 
            .send(updatedData);

        // Assertions
        expect(response).to.have.status(500);
        expect(response.body.message).to.include('Unexpected error');

        // Restore original behavior
        fs.readFile = originalReadFile;
    });
});
