// admin.test.js
const request = require('supertest');
const express = require('express');
const adminRouter = require('../server/src/routes/admin'); // Assuming the admin.js file is in the same directory

const app = express();
app.use(express.json());
app.use('/admin', adminRouter);

describe('Admin API Tests', () => {
  test('GET /admin - Get all admins', async () => {
    const response = await request(app).get('/admin');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    // Add more assertions based on your expected response
  });

  test('GET /admin?id=<admin_id> - Get specific admin by ID', async () => {
    const adminId = /* Specify a valid admin ID */1;
    const response = await request(app).get(`/admin?id=${adminId}`);
    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  });

  test('POST /admin - Add a new admin', async () => {
    const newAdmin = {
      admin_name: 'New 2 Admin Name',
      email: 'new2admin@example.com',
      passphrase: 'newpassphrase2',
    };
    const response = await request(app).post('/admin').send(newAdmin);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('New Admin created successfully');
    // Add more assertions based on your expected response
  });

  test('PUT /admin - Update admin details', async () => {
    const updatedAdmin = {
      id: /* Specify a valid admin ID */6,
      admin_name: 'Updated Admin Name',
      email: 'updatedadmin@example.com',
      passphrase: 'updatedpassphrase',
    };
    const response = await request(app).put('/admin').send(updatedAdmin);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin details updated successfully');
    // Add more assertions based on your expected response
  });

  test('DELETE /admin?id=<admin_id> - Delete admin by ID', async () => {
    const adminIdToDelete = /* Specify a valid admin ID to delete */1;
    const response = await request(app).delete(`/admin?id=${adminIdToDelete}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin Account Deleted Successfully');
    // Add more assertions based on your expected response
  });
});
