const request = require('supertest');
const app = require('../app.js'); 



describe('Restaurant API Tests', () => {
 
  it('should return status code 200 and an array of restaurants', async () => {
    const res = await request(app).get('/restaurants/restaurants');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return the correct restaurant data for a given ID', async () => {
    const id = 1; 
    const res = await request(app).get(`/restaurants/restaurants/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  }, 5000);

  it('should add a new restaurant to the array', async () => {
    const newRestaurant = { name: 'New Restaurant', cuisine: 'Italian' };
    const res = await request(app)
      .post('/restaurants/restaurants')
      .send(newRestaurant); 
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('New Restaurant');
  });

  
  it('should update the restaurant with the provided ID', async () => {
    const id = 1; 
    const updatedRestaurant = { name: 'Updated Restaurant' };
    const res = await request(app)
      .put(`/restaurants/restaurants/${id}`) 
      .send(updatedRestaurant);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Restaurant');
  });

  it('should delete the restaurant with the provided ID', async () => {
    const id = 1; 
    const res = await request(app).delete(`/restaurants/restaurants/${id}`); 
    expect(res.status).toBe(204);
  });
});
