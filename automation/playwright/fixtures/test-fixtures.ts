import { test as base } from '@playwright/test';
import { TicketsApiClient } from '../utils/tickets-api-client';

// Declare types of your fixtures
type CustomFixtures = {
  ticketsApi: TicketsApiClient;
};

// Extend basic test with custom fixture
export const test = base.extend<CustomFixtures>({
  ticketsApi: async ({ request }, use) => {
    // Set up the fixture
    const ticketsApi = new TicketsApiClient(request);
    
    // Pass fixture to the test
    await use(ticketsApi);
  },
});

export { expect } from '@playwright/test';
