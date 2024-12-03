const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let baseUrl;
const taskId="1733050328674375";//task id

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
    .put(`/tasks/${taskId}`)
    .send({ 
        name: 'Updated Task',
        description: 'Updated description',
        category:'Revision',
        start_time:'10:00',
        end_time:'12:00',
        timestamp:'2024-12-10'
    })
    .end((err, res) => {
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('Task modified successfully!');
    done();
    });
    });
    });
});
});
});