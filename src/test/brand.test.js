const request = require('supertest');
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const {faker} = require('@faker-js/faker');
const app = require('./app')

describe('POST /api/brands', () => {
  let categoryId;

  beforeEach(async () => {
    const category = await Category.create({
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
      parentId: null,
    });

    categoryId = category.id;
  });

  it('should create a brand successfully', async () => {
    const requestBody = {
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      categoryId: categoryId,
    };

    const response = await request(app)
      .post('/api/brands')
      .send(requestBody);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Brand created successfully');
    expect(response.body.data.name).toBe(requestBody.name);
    expect(response.body.data.description).toBe(requestBody.description);
  });

  it('should return 400 if required fields are missing', async () => {
    const requestBody = {
      description: faker.lorem.sentence(),
      categoryId: categoryId,
    };

    const response = await request(app)
      .post('/api/brands')
      .send(requestBody);

    expect(response.status).toBe(400);
  });
});
