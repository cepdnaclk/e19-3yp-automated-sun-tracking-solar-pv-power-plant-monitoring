const request = require("supertest");
const express = require("express");
const app = express();

// Importing your routes
const customerRoutes = require("../path/to/your/routes/customers");

// Mocking the authenticateToken middleware
jest.mock("../path/to/middleware/auth", () => ({
  authenticateToken: jest.fn((req, res, next) => {
    req.user_type = "customer"; // Mocking user_type as "customer" for testing
    next();
  }),
}));

// Mocking the execQuery function
jest.mock("../path/to/database/database", () => ({
  execQuery: jest.fn(() => Promise.resolve([])), // You can adjust the mock as needed
}));

// Adding the routes to the app
app.use("/", customerRoutes);

describe("View customers for company route", () => {
  it("should respond with 200 status and JSON data", async () => {
    try {
      const response = await request(app).get("/view");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  it("should respond with 200 status and JSON data for specific customer", async () => {
    try {
      const response = await request(app).get("/view?id=123");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("View own profile route", () => {
  it("should respond with 200 status and JSON data", async () => {
    try {
      const response = await request(app).get("/viewProfile");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("Register new customer route", () => {
  it("should respond with 200 status and success message", async () => {
    try {
      const response = await request(app).post("/register");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Registration Successful" });
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("Update customer profile route", () => {
  it("should respond with 200 status and success message", async () => {
    try {
      const response = await request(app).put("/updateProfile");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "User details updated successfully" });
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("Change customer password route", () => {
  it("should respond with 200 status and success message", async () => {
    try {
      const response = await request(app).put("/changePassword");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("Delete customer profile route", () => {
  it("should respond with 200 status and success message", async () => {
    try {
      const response = await request(app).delete("/deleteProfile");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Customer Account Deleted Successfully" });
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});