const request = require('supertest');
const app = require('../app.js'); 



describe('Restaurant API Tests', () => {
 
  it('should return status code 200 and an array of restaurants', async () => {
    const res = await request(app).get('/restaurants');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return the correct restaurant data for a given ID', async () => {
    const id = 1; 
    const res = await request(app).get(`/restaurants/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  }, 1000);
 
  // it('should add a new restaurant to the array', async () => {
  //   const newRestaurant = { name: 'New Restaurant', cuisine: 'Italian' };
  //   const res = await request(app)
  //     .post('/restaurants')
  //     .send(newRestaurant); 
  //   expect(res.status).toBe(201);
  //   expect(res.body.name).toBe('New Restaurant');
  // });

  
  it('should update the restaurant with the provided ID', async () => {
    const id = 1; 
    const updatedRestaurant = { name: 'Updated Restaurant' };
    const res = await request(app)
      .put(`/restaurants/${id}`) 
      .send(updatedRestaurant);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Restaurant');
  });

  it('should delete the restaurant with the provided ID', async () => {
    const id = 3; 
    const res = await request(app).delete(`/restaurants/${id}`); 
    expect(res.status).toBe(204);
  });
});

describe('POST /', () => {
  it('should return errors array if name field is empty', async () => {
    const response = await request(app)
      .post('/')
      .send({ location: 'Test Location', cuisine: 'Test Cuisine' });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('errors');
  });

  it('should return errors array if location field is empty', async () => {
    const response = await request(app)
      .post('/')
      .send({ name: 'Test Name', cuisine: 'Test Cuisine' });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('errors');
  });

  it('should return errors array if cuisine field is empty', async () => {
    const response = await request(app)
      .post('/')
      .send({ name: 'Test Name', location: 'Test Location' });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('errors');
  });
 
  it('should return errors array if multiple fields are empty', async () => {
    const response = await request(app).post('/').send({});
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('errors');
  });
});