import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import { describe, test, beforeEach, afterEach, vi, expect } from 'vitest';
import ChatBox from '../components/ChatBox';
import { ConversationContext } from '../components/ConversationContext';
import useFetchTalk from '../hooks/useFetchTalk';
import useLocalChat from '../hooks/useLocalChat';
import { TextInputItemConfig } from '../components/chat-items/ChatItemConfig';

vi.mock('../hooks/useFetchTalk');
vi.mock('../hooks/useLocalChat');

describe('ChatBox Component', () => {
    const mockUseFetchTalk = useFetchTalk as ReturnType<typeof vi.fn>;
    const mockUseLocalChat = useLocalChat as ReturnType<typeof vi.fn>;
    const mockSaveLocalChatHistory = useLocalChat as ReturnType<typeof vi.fn>;

    const defaultProps = {
        initTalkURL: 'http://example.com',
        message: undefined,
        updateStatus: '',
        fontSize: '16px',
        themeColor: '#4ea699',
    };

    const mockTalkCurrentItem = {
        id: 'stream-1',
        type: 'stream',
        text: 'Sample text',
        isCompleted: false,
    };

    beforeEach(() => {

        const mockSaveLocalChatHistory = vi.fn(() => console.log('saving local chat history...'));

        mockUseFetchTalk.mockReturnValue({
            talkCurrentItem: mockTalkCurrentItem,
            isLastItem: false,
        });

        mockUseLocalChat.mockReturnValue({
            loadLocalChat: vi.fn(() => []),
            saveLocalChatHistory:mockSaveLocalChatHistory,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('renders ChatBox component and displays chat items', () => {
        render(<ChatBox {...defaultProps} />);
        expect(screen.getByText('static-talk')).toBeInTheDocument();
    });

    test('loads initial talk and renders streamed chat item', async () => {
        mockUseFetchTalk.mockReturnValueOnce({
            talkCurrentItem: mockTalkCurrentItem,
            isLastItem: false,
        });

        await act(async () => {
            render(<ChatBox {...defaultProps} />);
        });

        expect(screen.getByText('Sample text')).toBeInTheDocument();
    });

    test('saves chat history after loading', () => {

        render(<ChatBox {...defaultProps} />);
        
        expect(mockSaveLocalChatHistory).toHaveBeenCalled();
    });

    test('switches conversation when the switchTalk function is called', () => {
        const mockSwitchConversation = vi.fn();

        render(
            <ConversationContext.Provider value={{ switchConversation: mockSwitchConversation }}>
                <ChatBox {...defaultProps} />
            </ConversationContext.Provider>
        );

        act(() => {
            mockSwitchConversation('http://new-example.com');
        });

        expect(mockSwitchConversation).toHaveBeenCalledWith('http://new-example.com');
    });

    test('handles AI messages and updates chat items accordingly', async () => {
        const newMessage: TextInputItemConfig = {
            id: 'stream-2',
            type: 'text-input',
            text: 'New AI message',
        };

        render(<ChatBox {...defaultProps} message={newMessage} />);

        expect(screen.getByText('New AI message')).toBeInTheDocument();
    });
});