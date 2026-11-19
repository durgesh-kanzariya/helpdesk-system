import { test, expect } from '@playwright/test';

test.describe.serial('HelpDesk Tickets API - CRUD & Negative Tests', () => {
  let createdTicketId: number;
  const uniqueTitle = `Playwright Auto Ticket - ${Date.now()}`;

  test('1. POST /api/Tickets - should successfully create a new ticket', async ({ request }) => {
    const response = await request.post('/api/Tickets', {
      data: {
        title: uniqueTitle,
        status: 'Open',
        userId: Number(process.env.DEFAULT_USER_ID) || 1,
        categoryId: Number(process.env.DEFAULT_CATEGORY_ID) || 1
      }
    });

    // Verify status code 201 Created
    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.id).toBeGreaterThan(0);
    expect(body.title).toBe(uniqueTitle);
    expect(body.status).toBe('Open');

    // Save ID for subsequent tests in this suite (Request Chaining)
    createdTicketId = body.id;
    console.log(`[Playwright API] Created ticket with ID: ${createdTicketId}`);
  });

  test('2. GET /api/Tickets - should retrieve all tickets as an array', async ({ request }) => {
    const response = await request.get('/api/Tickets');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('3. GET /api/Tickets/{id} - should retrieve ticket details by ID', async ({ request }) => {
    expect(createdTicketId).toBeDefined();

    const response = await request.get(`/api/Tickets/${createdTicketId}`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(createdTicketId);
    expect(body.title).toBe(uniqueTitle);
  });

  test('4. PUT /api/Tickets/{id} - should update ticket status to Resolved', async ({ request }) => {
    expect(createdTicketId).toBeDefined();

    const response = await request.put(`/api/Tickets/${createdTicketId}`, {
      data: {
        id: createdTicketId,
        title: `${uniqueTitle} [UPDATED]`,
        status: 'Resolved',
        userId: Number(process.env.DEFAULT_USER_ID) || 1,
        categoryId: Number(process.env.DEFAULT_CATEGORY_ID) || 1
      }
    });

    // 204 No Content indicates successful update with no returned body
    expect(response.status()).toBe(204);
  });

  test('5. DELETE /api/Tickets/{id} - should delete ticket', async ({ request }) => {
    expect(createdTicketId).toBeDefined();

    const response = await request.delete(`/api/Tickets/${createdTicketId}`);
    expect(response.status()).toBe(204);

    // Verify it is indeed gone (404)
    const verifyResponse = await request.get(`/api/Tickets/${createdTicketId}`);
    expect(verifyResponse.status()).toBe(404);
  });

  test('6. GET /api/Tickets/999999 - should return 404 for non-existent ticket', async ({ request }) => {
    const response = await request.get('/api/Tickets/999999');

    expect(response.status()).toBe(404);
    const errorText = await response.text();
    expect(errorText).toContain('Ticket not found');
  });
});
