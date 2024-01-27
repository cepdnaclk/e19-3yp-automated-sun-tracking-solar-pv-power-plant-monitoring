// admin.test.js
const request = require('supertest');
const express = require('express');
const adminRouter = require('../server/src/routes/admin'); // Assuming the admin.js file is in the same directory

const app = express();
app.use(express.json());
app.use('/admin', adminRouter);

describe('Admin API Tests', () => {
  test('GET /admin/view - Get all admins', async () => {
    const response = await request(app).get('/admin/view');
    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  });

  test('GET /admin/view?id=<admin_id> - Get specific admin by ID', async () => {
    const adminId = /* Specify a valid admin ID */1;
    const response = await request(app).get(`/admin/view?id=${adminId}`);
    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  });

  test('POST /admin/new - Add a new admin', async () => {
    const newAdmin = {
      username: 'New2Admin',
      user_type: 'admin',
      email: 'new2admin@example.com',
      passphrase: 'newpassphrase2',
      contact_number: '1234567890',
      user_address: '123 New Street',
    };
    const response = await request(app).post('/admin/new').send(newAdmin);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('New Admin user created successfully');
    // Add more assertions based on your expected response
  });

  test('PUT /admin/myProfile - Update admin details', async () => {
    const updatedAdmin = {
      id: /* Specify a valid admin ID */6,
      username: 'UpdatedAdmin',
      user_type: 'admin',
      email: 'updatedadmin@example.com',
      contact_number: '9876543210',
      user_address: '456 Updated Street',
    };
    const response = await request(app).put('/admin/myProfile').send(updatedAdmin);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin details updated successfully');
    // Add more assertions based on your expected response
  });

  test('PUT /admin/changePassword - Change admin password', async () => {
    const changePasswordData = {
      old_password: 'securepassword',
      new_password: 'newsecurepassword',
    };
    const response = await request(app).put('/admin/changePassword').send(changePasswordData);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Password changed successfully');
    // Add more assertions based on your expected response
  });

  test('DELETE /admin/deleteAccount?id=<admin_id> - Delete admin by ID', async () => {
    const adminIdToDelete = /* Specify a valid admin ID to delete */1;
    const passwordToDelete = 'securepassword';
    const response = await request(app).delete(`/admin/deleteAccount?id=${adminIdToDelete}`).send({ password: passwordToDelete });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin Account Deleted Successfully');
    // Add more assertions based on your expected response
  });
});
