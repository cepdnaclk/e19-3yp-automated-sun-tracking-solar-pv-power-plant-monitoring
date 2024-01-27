// companies.test.js
const request = require('supertest');
const express = require('express');
const companiesRouter = require('../server/src/routes/companies');
const { execQuery } = require('../server/src/database/database');

const app = express();
app.use(express.json());
app.use('/companies', companiesRouter);

describe('Companies API Tests', () => {
  test('GET /companies/view - Get all companies (admin)', async () => {
    const response = await request(app).get('/companies/view').set('Authorization', 'Bearer <admin_token>');
    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  });

  test('GET /companies/view?id=<company_id> - Get specific company by ID (admin)', async () => {
    const companyId = /* Specify a valid company ID */1;
    const response = await request(app).get(`/companies/view?id=${companyId}`).set('Authorization', 'Bearer <admin_token>');
    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  });

  test('GET /companies/view - Get all companies (non-admin)', async () => {
    const response = await request(app).get('/companies/view').set('Authorization', 'Bearer <non_admin_token>');
    expect(response.status).toBe(401);
    // Add more assertions based on your expected response
  });

  test('GET /companies/myprofile - Get own company profile', async () => {
    const response = await request(app).get('/companies/myprofile').set('Authorization', 'Bearer <company_token>');
    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  });

  test('POST /companies/new - Add a new company (admin)', async () => {
    const newCompany = {
      username: 'NewCompany',
      user_type: 'company',
      email: 'newcompany@example.com',
      passphrase: 'newpassphrase',
      contact_number: '1234567890',
      user_address: '123 New Street',
    };
    const response = await request(app).post('/companies/new').set('Authorization', 'Bearer <admin_token>').send(newCompany);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(newCompany.username);
    // Add more assertions based on your expected response
  });

  test('POST /companies/new - Add a new company (non-admin)', async () => {
    const newCompany = {
      username: 'NewCompany',
      user_type: 'company',
      email: 'newcompany@example.com',
      passphrase: 'newpassphrase',
      contact_number: '1234567890',
      user_address: '123 New Street',
    };
    const response = await request(app).post('/companies/new').set('Authorization', 'Bearer <non_admin_token>').send(newCompany);
    expect(response.status).toBe(401);
    // Add more assertions based on your expected response
  });

  test('PUT /companies/update - Update company details (company)', async () => {
    const updatedCompany = {
      username: 'UpdatedCompany',
      user_type: 'company',
      email: 'updatedcompany@example.com',
      contact_number: '9876543210',
      user_address: '456 Updated Street',
    };
    const response = await request(app).put('/companies/update').set('Authorization', 'Bearer <company_token>').send(updatedCompany);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Company details updated successfully');
    // Add more assertions based on your expected response
  });

  test('PUT /companies/update - Update company details (non-company)', async () => {
    const updatedCompany = {
      username: 'UpdatedCompany',
      user_type: 'company',
      email: 'updatedcompany@example.com',
      contact_number: '9876543210',
      user_address: '456 Updated Street',
    };
    const response = await request(app).put('/companies/update').set('Authorization', 'Bearer <non_company_token>').send(updatedCompany);
    expect(response.status).toBe(401);
    // Add more assertions based on your expected response
  });

  test('PUT /companies/changePassword - Change company password', async () => {
    const changePasswordData = {
      currentPassword: 'securepassword',
      newPassword: 'newsecurepassword',
    };
    const response = await request(app).put('/companies/changePassword').set('Authorization', 'Bearer <company_token>').send(changePasswordData);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Password changed successfully');
    // Add more assertions based on your expected response
  });

  test('PUT /companies/changePassword - Change company password (non-company)', async () => {
    const changePasswordData = {
      currentPassword: 'securepassword',
      newPassword: 'newsecurepassword',
    };
    const response = await request(app).put('/companies/changePassword').set('Authorization', 'Bearer <non_company_token>').send(changePasswordData);
    expect(response.status).toBe(401);
    // Add more assertions based on your expected response
  });

  test('DELETE /companies/deleteCompany - Delete company by ID (admin)', async () => {
    const companyIdToDelete = /* Specify a valid company ID to delete */1;
    const passwordToDelete = 'admin_password';
    const response = await request(app).delete('/companies/deleteCompany').set('Authorization', 'Bearer <admin_token>').send({ companyId: companyIdToDelete, password: passwordToDelete });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Customer Account Deleted Successfully');
    // Add more assertions based on your expected response
  });

  test('DELETE /companies/deleteCompany - Delete company by ID (non-admin)', async () => {
    const companyIdToDelete = /* Specify a valid company ID to delete */1;
    const passwordToDelete = 'admin_password';
    const response = await request(app).delete('/companies/deleteCompany').set('Authorization', 'Bearer <non_admin_token>').send({ companyId: companyIdToDelete, password: passwordToDelete });
    expect(response.status).toBe(401);
    // Add more assertions based on your expected response
  });
});