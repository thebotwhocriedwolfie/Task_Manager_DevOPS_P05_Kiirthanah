/*const { describe, it } = require('mocha');
const { expect } = require('chai');
const { server } = require('../index'); 

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let baseUrl; 
const existingTaskId = "1731270215089046"; // task id from tasks.json

describe('Task API', () => {
    before((done) => {
        const { address, port } = server.address();
        baseUrl = `http://${address === '::' ? 'localhost' : address}:${port}`;
        done();
    });

    after((done) => {
        server.close(() => done());
    });

    describe('PUT /tasks/:id', () => {
        it('should update an existing task', (done) => {
            chai.request(baseUrl)
                .put(`/tasks/${existingTaskId}`)
                .send({
                    name: 'Updated Task',
                    description: 'Updated Description',
                    category: 'Updated Category',
                    start_time: '10:00',
                    end_time: '12:00',
                    timestamp: '2024-12-01',
                })
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Task modified successfully');
                    //expect(res.body.data).to.be.an('array').that.has.lengthOf(5);
                    expect(res.body.data).to.deep.equal({
                        id: existingTaskId,
                        name: 'Updated Task',
                        description: 'Updated Description',
                        category: 'Updated Category',
                        start_time: '10:00',
                        end_time: '12:00',
                        timestamp: '2024-12-01',
                    });

            
                    done();
                });
        });
    });

    describe('PUT /tasks/:id - Negative Cases', () => {
        it('should return 404 for a non-existent task ID', (done) => {
            chai.request(baseUrl)
                .put('/tasks/nonExistentId')
                .send({
                    name: 'Invalid Task',
                    description: 'Invalid Description',
                })
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.message).to.equal('Task not found');
                    done();
                });
        });
    
        it('should return 400 for invalid input data', (done) => {
            chai.request(baseUrl)
                .put(`/tasks/${existingTaskId}`)
                .send({}) // Missing required fields
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal('Invalid task data');
                    done();
                });
        });
    });
    
});*/



/*const { describe, it } = require('mocha');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const fs = require('fs');
const { server } = require('../index');

chai.use(chaiHttp);

let baseUrl;
const existingTaskId = "1733050328674375";
const taskFilePath = 'utils/tasks.json'; // Ensure this is the correct path

describe('Task API', () => {
    let readFileStub, writeFileStub;

    before((done) => {
        const { address, port } = server.address();
        baseUrl = `http://${address === '::' ? 'localhost' : address}:${port}`;
        done();
    });

    after((done) => {
        server.close(() => done());
    });

    beforeEach(() => {
        // Stub fs.readFile
        readFileStub = sinon.stub(fs, 'readFile').callsFake((path, encoding, callback) => {
            if (path === taskFilePath) {
                const fakeData = JSON.stringify([
                    { id: "1733050328674375", name: "Task", description: "A sample task" },
                ]);
                callback(null, fakeData);
            } else {
                callback(new Error('File not found'));
            }
        });
    
        // Stub fs.writeFile
        writeFileStub = sinon.stub(fs, 'writeFile').callsFake((path, data, callback) => {
            if (path === taskFilePath) {
                callback(null); // Simulate a successful write
            } else {
                callback(new Error('Write error'));
            }
        });
    });
    

    afterEach(() => {
        // Restore stubs
        readFileStub.restore();
        writeFileStub.restore();
    });

    describe('PUT /tasks/:id', () => {
        it('should update an existing task', (done) => {
            const updatedTask = {
                name: 'Updated Task',
                description: 'Updated Description',
                category: 'Revision',
                start_time: '10:00',
                end_time: '12:00',
                timestamp: '2024-12-10',
            };

            chai.request(server)
                .put(`/tasks/${existingTaskId}`)
                .send(updatedTask)
                .end((err, res) => {
                    if (err) return done(err);

                    // Validate the response
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Task modified successfully');

                    // Validate that fs.writeFile was called
                    sinon.assert.calledOnce(writeFileStub);

                    // Check written data
                    const writtenData = JSON.parse(writeFileStub.getCall(0).args[1]);
                    const task = writtenData.find(t => t.id === existingTaskId);
                    expect(task).to.include(updatedTask);

                    done();
                });
        });
    });
});*/

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
        // Prepare the test data
        const testData = {
            name: 'Updated Task Name',
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
            .send(testData);

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
