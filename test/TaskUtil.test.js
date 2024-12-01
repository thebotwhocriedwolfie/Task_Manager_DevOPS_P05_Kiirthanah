const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let baseUrl;
describe('Task API', () => {
before(async () => {
const { address, port } = await server.address();
baseUrl = `http://${address == '::'? 'localhost': address}:${port}`;
});
after(() => {
return new Promise((resolve) => {
server.close(() => {
resolve();
});

// Test Suite for editing tasks
describe('PUT /tasks/:id', () => {
    it('should update an existing task', (done) => {
    chai.request(baseUrl)
    .put(`/edit-task/${taskId}`)
    .send({ 
        name: 'Updated Task',
        description: 'Updated description',
        category:'Updated Category',
        start_time:'Updated Start Time',
        end_time:'Updated End time',
        timestamp:'Updated Timestamp'
    })
    .end((err, res) => {
    expect(res).to.have.status(201);
    expect(res.body.message).to.equal('Task modified successfully!');
    done();
    });
    });
    });
    // Test Suite for deleting resources
    describe('DELETE /tasks/:id', () => {
    it('should delete an existing task', (done) => {
    chai.request(baseUrl)
    .delete(`/tasks/${taskId}`)
    .end((err, res) => {
    expect(res).to.have.status(201);
    expect(res.body.message).to.equal('Task deleted successfully!');
    done();
    });
    });
    });
});
});
});