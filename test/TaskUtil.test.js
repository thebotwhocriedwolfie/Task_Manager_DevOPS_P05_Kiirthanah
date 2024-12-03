const { describe, it } = require('mocha');
const { expect } = require('chai');
const { server } = require('../index'); // Import server for testing

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let baseUrl; 
const existingTaskId = "1733068885969652"; //task id

describe('Task API', () => {
    before((done) => {
        const { address, port } = server.address();
        baseUrl = `http://${address === '::' ? 'localhost' : address}:${port}`;
        done();
    });

    after((done) => {
        server.close(() => done());
    });
    
    //Update Test
    describe('PUT /tasks/:id', () => {
        it('should update an existing task', (done) => {
            chai.request(baseUrl)
                .put(`/tasks/${existingTaskId}`)
                .send({
                    name: 'Updated Task',
                    description: 'Updated Description',
                    category: 'Revision',
                    start_time: '10:00',
                    end_time: '12:00',
                    timestamp: '2024-12-01',
                })
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Task modified successfully');
                    done();
                });
        });
    });
});


/*const { describe, it } = require('mocha');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const fs = require('fs');
const { server } = require('../index'); // Import server for testing

chai.use(chaiHttp);

let baseUrl;
const existingTaskId = "1733068838125129"; // Task ID
const taskFilePath="utils/tasks"//json path



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
                    { id: "1733068838125129", name: "Task", description: "task" },
                ]);
                callback(null, fakeData);
            } else {
                callback(new Error('File not found'));
            }
        });
    
        // Stub fs.writeFile
        writeFileStub = sinon.stub(fs, 'writeFile').callsFake((path, data, callback) => {
            if (path === taskFilePath) {
                callback(null); // Simulate successful write
            } else {
                callback(new Error('Write error'));
            }
        });
    });

    afterEach(() => {
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
                timestamp: '2024-12-01',
            };

            chai.request(server)
                .put(`/tasks/${existingTaskId}`)
                .send(updatedTask)
                .end((err, res) => {
                    if (err) return done(err);

                    // Validate the response
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Task modified successfully');

                    // Validate that fs.writeFile was called with the updated task
                    sinon.assert.calledOnce(writeFileStub);
                    const writtenData = JSON.parse(writeFileStub.getCall(0).args[1]);
                    const task = writtenData.find(t => t.id === existingTaskId);
                    expect(task).to.include(updatedTask);

                    done();
                });
        });
    });
});*/