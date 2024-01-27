const request = require("supertest");
const express = require("express");
const app = express();

// Importing your routes
const loginRoutes = require("../server/src/routes/login");

// Mocking the database connection
jest.mock("../server/src/database/database", () => ({
  connection: {
    query: jest.fn(),
  },
}));

// Mocking the bcrypt module
jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

// Mocking the jwt module
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

// Mocking the auth middleware
jest.mock("../middleware/auth", () => ({
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
}));

// Adding the routes to the app
app.use("/", loginRoutes);

describe("Login route", () => {
  it("should respond with 200 status and access token on successful login", async () => {
    // Mocking the request body
    const reqBody = {
      username: "john.doe@example.com",
      password: "securepassword",
    };

    // Mocking the database query result
    const queryResult = [
      {
        email: "john.doe@example.com",
        user_type: "admin",
        id: 1,
        passphrase: "hashedpassword",
      },
    ];

    // Mocking the bcrypt compare function
    const bcryptCompareMock = jest.fn(() => true);
    jest.mock("bcryptjs", () => ({
      compare: bcryptCompareMock,
    }));

    // Mocking the jwt sign function
    const jwtSignMock = jest.fn(() => "mockedAccessToken");
    jest.mock("jsonwebtoken", () => ({
      sign: jwtSignMock,
    }));

    // Mocking the generateAccessToken function
    const generateAccessTokenMock = jest.fn(() => "mockedAccessToken");
    jest.mock("../middleware/auth", () => ({
      generateAccessToken: generateAccessTokenMock,
    }));

    // Mocking the generateRefreshToken function
    const generateRefreshTokenMock = jest.fn(() => "mockedRefreshToken");
    jest.mock("../middleware/auth", () => ({
      generateRefreshToken: generateRefreshTokenMock,
    }));

    // Mocking the response object
    const res = {
      json: jest.fn(),
    };

    // Mocking the request object
    const req = {
      body: reqBody,
    };

    // Mocking the database connection query method
    const connectionQueryMock = jest.fn((query, callback) => {
      callback(null, queryResult);
    });
    jest.mock("../database/database", () => ({
      connection: {
        query: connectionQueryMock,
      },
    }));

    // Making the request to the login route
    await request(app).post("/").send(reqBody);

    // Asserting the response
    expect(res.json).toHaveBeenCalledWith({
      message: "Login Successful",
      accessToken: "mockedAccessToken",
      refreshToken: "mockedRefreshToken",
      username: "john.doe@example.com",
      user_type: "admin",
      user_id: 1,
    });

    // Asserting the database query
    expect(connectionQueryMock).toHaveBeenCalledWith(
      `SELECT email, user_type, id, passphrase FROM user WHERE username = 'john.doe@example.com';`,
      expect.any(Function)
    );

    // Asserting the bcrypt compare
    expect(bcryptCompareMock).toHaveBeenCalledWith(
      "securepassword",
      "hashedpassword"
    );

    // Asserting the jwt sign
    expect(jwtSignMock).toHaveBeenCalledWith(
      {
        username: "john.doe@example.com",
        user_type: "admin",
        user_id: 1,
        email: "john.doe@example.com",
      },
      expect.any(String),
      expect.any(Object)
    );

    // Asserting the generateAccessToken
    expect(generateAccessTokenMock).toHaveBeenCalledWith(
      "john.doe@example.com",
      "admin",
      1,
      "john.doe@example.com"
    );

    // Asserting the generateRefreshToken
    expect(generateRefreshTokenMock).toHaveBeenCalledWith(
      "john.doe@example.com",
      "admin",
      1,
      "john.doe@example.com"
    );
  });

  // Add more test cases as needed
});