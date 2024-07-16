import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { test, afterEach, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

const server = setupServer(
  http.get('/conversation-question.json', () => {
    return HttpResponse.json(
      {
        "conversation": [
          {
            "type": "statement",
            "text": "Hey there! This is a test message"
          }
        ]
      }
    )
  }),
)

beforeAll(() => server.listen())
beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks()
})
afterAll(() => server.close())

test('renders showcase page', async () => {
  // render(<App />);
  // const conversationStream = screen.getAllByTestId("tac-ui-root");
  // expect(conversationStream).toHaveLength(1);
});