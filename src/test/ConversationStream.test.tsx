import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react'
import { expect, test, afterEach, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import ChatBox from '../components/ChatBox';

const server = setupServer(
  http.get('/conversation-question.json', () => {
    return HttpResponse.json(
      {
        "conversation": [
          {
            "type": "statement",
            "text": "Hey there! This is a test message"
          },
          {
            "type": "statement",
            "text": "I wish you have a great sunny day and night"
          },
          {
            "type": "statement",
            "text": "and a productive testing session"
          },
          {
            "type": "statement",
            "text": "great UIs can talk!"
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

test('renders the Conversation Stream', async () => {
  render(<ChatBox initTalkURL='/conversation-question.json' chatHeight='500px' chatWidth='300px' qaMessage='' qaMessageType='answer'/>);
  
  const conversationStream = screen.getAllByTestId("tac-ui-root");

  await vi.advanceTimersByTimeAsync(700);
  expect(conversationStream[0]).toHaveTextContent("Hey there! This is a test message")

  await vi.advanceTimersByTimeAsync(1000);
  expect(conversationStream[0]).toHaveTextContent("I wish you have a great sunny day and night");

  await vi.advanceTimersByTimeAsync(500);
  expect(conversationStream[0]).toHaveTextContent("and a productive testing session");

  await vi.advanceTimersByTimeAsync(400);
  expect(conversationStream[0]).toHaveTextContent("great UIs can talk!");

  // TODO WHY THIS IS NEVER VISIBLE???
  // expect(await screen.findByText('Hey there! This is a test message')).toBeVisible();
});