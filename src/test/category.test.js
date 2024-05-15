const { createCategory } = require("../controllers/category.controller");
const Category = require("../models/category.model");
const sendResponse = require("../utils/sendResponse");

jest.mock("../models/category.model"); // Mocking Sequelize model
jest.mock("../utils/sendResponse"); // Mocking sendResponse utility

describe("createCategory", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should create a category with valid input", async () => {
    const req = {
      body: {
        name: "Test Category",
        description: "Test description",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const createdCategory = { id: 1, name: "Test Category", description: "Test description" };
    Category.create.mockResolvedValueOnce(createdCategory);

    await createCategory(req, res);

    expect(Category.create).toHaveBeenCalledWith(req.body);
    expect(sendResponse).toHaveBeenCalledWith(
      res,
      201,
      "Category created successfully",
      createdCategory
    );
  });

  it("should return an error for missing category name", async () => {
    const req = {
      body: {
        description: "Test description",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await createCategory(req, res);

    expect(sendResponse).toHaveBeenCalledWith(res, 400, expect.any(String), null);
  });

  // Add more test cases for other scenarios
});
