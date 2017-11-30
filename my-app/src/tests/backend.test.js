const request = require('supertest');
const app = require('../server/app.js', {bustCache: true});

//In case of slow database response
jest.setTimeout(30000);

//Testing the routes
describe('Test the root path', () => {
  test('It should response with 200 status code', done => {
    request(app).get('/patient').then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Test that cross-origin headers have been applied correctly', done => {
    request(app).get('/patient').then(response => {
      expect(response.headers['access-control-allow-headers']).toBe(
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      expect(response.headers['access-control-allow-origin']).toBe('*');
      done();
    });
  });

  test('Test that the body is an array', done => {
    request(app).get('/patient').then(response => {
      expect(Array.isArray(JSON.parse(response.text).content)).toBeTruthy();
      done();
    });
  });

  test('Test that the array has length > 0', done => {
    request(app).get('/patient').then(response => {
      expect(Array.isArray(JSON.parse(response.text).content)).toBeTruthy();
      done();
    });
  });
});

describe('Test that server returns 404 for unknown routes', () => {
  test('It should response with 404 status code', done => {
    request(app).get('/something').then(response => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});

describe('Test the patient/id route', () => {
  test('It should response with 200 status code', done => {
    request(app).get('/patient/24207334065940285913').then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Test that the parsed body is an object', done => {
    request(app).get('/patient/24207334065940285913').then(response => {
      expect(typeof JSON.parse(response.text)).toBe('object');
      done();
    });
  });

  test('Test that the object has firstName, lastname and dateOfBirth properties', done => {
    request(app).get('/patient/24207334065940285913').then(response => {
      expect(JSON.parse(response.text).firstName).toBeTruthy();
      expect(JSON.parse(response.text).lastName).toBeTruthy();
      expect(JSON.parse(response.text).dateOfBirth).toBeTruthy();
      done();
    });
  });
});
