import { render, screen } from '@testing-library/react'
import { expect, test, afterEach, beforeEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import WordStreamer from '../components/WordStreamer';

beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  vi.restoreAllMocks()
})

test('renders a word streamer', async () => {
  render(<WordStreamer
    words='Hey there! This is a test message for testing out the WordStreamer component. Remember: great UIs can talk!'
    loopStyle='stay'
  />);
  const wordStream = screen.getAllByTestId("tac-ui-word-streamer");
  expect(wordStream[0]).toBeInTheDocument();
  expect(wordStream).toHaveLength(1);
  expect(wordStream[0].innerHTML).toContain("")
  await vi.advanceTimersByTimeAsync(1000);
  expect(wordStream[0].innerHTML).toContain("Hey there! This is a test message for testing out")
  await vi.advanceTimersByTimeAsync(1000);
  expect(wordStream[0].innerHTML).toContain("Hey there! This is a test message for testing out the WordStreamer component. Remember: great UIs can talk!")
  // TODO WHY THIS IS NEVER VISIBLE???
  // expect(await screen.findByText('Hey')).toBeVisible();
});