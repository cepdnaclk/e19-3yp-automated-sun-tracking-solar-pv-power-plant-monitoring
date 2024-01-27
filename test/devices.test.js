const request = require("supertest");
const express = require("express");
const app = express();

// Importing your routes
const deviceRoutes = require("../path/to/your/routes");

// Mocking the authenticateToken middleware
jest.mock("../path/to/middleware/auth", () => ({
  authenticateToken: jest.fn((req, res, next) => {
    req.user_type = "admin"; // Mocking user_type as "admin" for testing
    next();
  }),
}));

// Mocking the execQuery function
jest.mock("../path/to/database/database", () => ({
  execQuery: jest.fn(() => Promise.resolve([])), // You can adjust the mock as needed
}));

// Adding the routes to the app
app.use("/", deviceRoutes);

describe("View devices for admins route", () => {
  it("should respond with 200 status and JSON data", async () => {
    try {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});
const request = require("supertest");
const express = require("express");
const app = express();

// Importing your routes
const deviceRoutes = require("../path/to/your/routes");

// Mocking the authenticateToken middleware
jest.mock("../path/to/middleware/auth", () => ({
  authenticateToken: jest.fn((req, res, next) => {
    req.user_type = "admin"; // Mocking user_type as "admin" for testing
    next();
  }),
}));

// Mocking the execQuery function
jest.mock("../path/to/database/database", () => ({
  execQuery: jest.fn(() => Promise.resolve([])), // You can adjust the mock as needed
}));

// Adding the routes to the app
app.use("/", deviceRoutes);

describe("View devices for admins route", () => {
  it("should respond with 200 status and JSON data", async () => {
    try {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("View devices for companies route", () => {
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

  // Add more test cases as needed
});

describe("View devices for customers route", () => {
  it("should respond with 200 status and JSON data", async () => {
    try {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("View contact details of the device's company route", () => {
  it("should respond with 200 status and JSON data", async () => {
    try {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("Add new device route", () => {
  it("should respond with 200 status and success message", async () => {
    try {
      const response = await request(app).post("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "New Device created successfully" });
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("Update device route", () => {
  it("should respond with 200 status and success message for admin", async () => {
    try {
      const response = await request(app).put("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Device Specifications updated successfully" });
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  it("should respond with 200 status and success message for company", async () => {
    try {
      const response = await request(app).put("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Device Specifications updated successfully" });
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("Add device by customer route", () => {
  it("should respond with 200 status and success message", async () => {
    try {
      const response = await request(app).post("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Device Specifications updated successfully" });
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});

describe("Remove device from customer's app route", () => {
  it("should respond with 200 status and success message", async () => {
    try {
      const response = await request(app).put("/remove");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Device Specifications updated successfully" });
    } catch (error) {
      console.error("Test error:", error);
      console.log("Response body:", error.response.body);
      throw error;
    }
  });

  // Add more test cases as needed
});