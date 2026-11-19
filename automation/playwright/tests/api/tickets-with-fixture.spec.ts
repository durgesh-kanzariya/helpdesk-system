import { test, expect } from '../../fixtures/test-fixtures';

test.describe.serial('Tickets API using Custom Fixtures and POM Pattern', () => {
  let ticketId: number;

  test('Create ticket using ticketsApi fixture', async ({ ticketsApi }) => {
    const response = await ticketsApi.createTicket({
      title: 'Created via Custom Fixture',
      status: 'Open',
      userId: 1,
      categoryId: 1
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    ticketId = body.id;
    expect(ticketId).toBeDefined();
  });

  test('Read ticket by ID using ticketsApi fixture', async ({ ticketsApi }) => {
    const response = await ticketsApi.getTicketById(ticketId);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Created via Custom Fixture');
  });

  test('Clean up ticket using ticketsApi fixture', async ({ ticketsApi }) => {
    const response = await ticketsApi.deleteTicket(ticketId);
    expect(response.status()).toBe(204);
  });
});
