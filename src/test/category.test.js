const request = require("supertest");
const Category = require("../models/category.model");
const { faker } = require("@faker-js/faker");
const app = require('./app')
describe("POST /api/categories", () => {
  it("should create a category successfully", async () => {
    const requestBody = {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      parentId: null,
    };

    const response = await request(app)
      .post("/api/categories")
      .send(requestBody);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Category created successfully");
    expect(response.body.data.name).toBe(requestBody.name);
    expect(response.body.data.description).toBe(requestBody.description);

    const createdCategory = await Category.findOne({ where: { name: requestBody.name } });
    expect(createdCategory).toBeDefined();
    expect(createdCategory.description).toBe(requestBody.description);
  });

  it('should return 400 if name is not provided for creating a category', async () => {
    const requestBody = {
      description: faker.lorem.sentence(),
      parentId: null,
    };
  
    const response = await request(app)
      .post('/api/categories')
      .send(requestBody);
  
    expect(response.status).toBe(400);
  });
  
});

describe("PUT /api/categories/:id", () => {
  it("should update a category successfully", async () => {
    // Create a category to update
    const existingCategory = await Category.create({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      parentId: null,
    });

    // Mock request body for updating category
    const updatedName = faker.commerce.productName();
    const updatedDescription = faker.lorem.sentence();
    const updatedRequestBody = {
      name: updatedName,
      description: updatedDescription,
      parentId: null,
    };

    // Make request to update category
    const response = await request(app)
      .put(`/api/categories/${existingCategory.id}`)
      .send(updatedRequestBody);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Category updated successfully");
    expect(response.body.data.name).toBe(updatedName);
    expect(response.body.data.description).toBe(updatedDescription);
  });

  it('should return 400 if name is not provided for updating a category', async () => {
    // Create a category for testing
    const existingCategory = await Category.create({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      parentId: null,
    });
  
    const requestBody = {
      description: faker.lorem.sentence(),
      parentId: null,
    };
  
    const response = await request(app)
      .put(`/api/categories/${existingCategory.id}`)
      .send(requestBody);
  
    expect(response.status).toBe(400);
  });
  
});


describe("DELETE /api/categories/:id", () => {
  it("should delete a category successfully", async () => {
    // Create a category to delete
    const existingCategory = await Category.create({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      parentId: null,
    });

    // Make request to delete category
    const response = await request(app).delete(`/api/categories/${existingCategory.id}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Category deleted successfully");

    // Check if the category has been deleted from the database
    const deletedCategory = await Category.findByPk(existingCategory.id);
    expect(deletedCategory).toBeNull();
  });
});


describe('GET /api/categories', () => {
    it('should get all categories successfully', async () => {
      const category1 = await Category.create({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        parentId: null,
      });
  
      const category2 = await Category.create({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        parentId: null,
      });
  
      // Make request to get all categories
      const response = await request(app)
        .get('/api/categories');
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Categories retrieved successfully');
    });
  });


describe('GET /api/categories/:id', () => {
    it('should get a category by ID successfully', async () => {
      // Create a category for testing
      const category = await Category.create({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        parentId: null,
      });
  
      // Make request to get category by ID
      const response = await request(app)
        .get(`/api/categories/${category.id}`);
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Category retrieved successfully');
      expect(response.body.data.id).toBe(category.id);
      expect(response.body.data.name).toBe(category.name);
      expect(response.body.data.description).toBe(category.description);
      // Add more assertions to validate other properties of the retrieved category
    });
  
    it('should return 404 if category ID is not found', async () => {
      // Generate a non-existing category ID
      const nonExistingCategoryId = 3939;
  
      // Make request to get category by non-existing ID
      const response = await request(app)
        .get(`/api/categories/${nonExistingCategoryId}`);
  
      // Assertions
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Category not found');
      expect(response.body.data).toBeNull();
    });
  });

  