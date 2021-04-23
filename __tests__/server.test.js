'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest'); 
const mockRequest = supertest(server); 

describe('WEB SERVER:', () => {

  //======================/404/==============================//

  it('should respond with a 404 on not found', async () => {
    return mockRequest.get('/').then(data => {
      expect(data.status).toBe(404);
    });
  });

  it('should respond with a 404 on not found', async () => {
    return mockRequest.get('/bad-path').then(data => {
      expect(data.status).toBe(404);
    });
  });

   //======================/201/==============================//
  it('should create a new item in the db', async () => {
    const response = await mockRequest.post('/candy').send({ name: 'candy' })
    expect(response.status).toBe(201);
    expect(response.body.record.name).toEqual('candy');
  });

  it('should create a new item in the db', async () => {
    const response = await mockRequest.post('/food').send({ name: 'food' })
    expect(response.status).toBe(201);
    expect(response.body.record.name).toEqual('food');
  });
 //======================/200/==============================//

  it('should retrieve an item from the db', async () => {
    const response = await mockRequest.get('/candy/1');
    expect(response.status).toBe(200);
   
    console.log(response.body);
  });

  it('should retrieve an item from the db', async () => {
    const response = await mockRequest.get('/food/1');
    expect(response.status).toBe(200);
   
    console.log(response.body);
  });

  it('should retrieve all items from the db', async () => {
    const response = await mockRequest.get('/food');
    expect(response.status).toBe(200);
  });
});
