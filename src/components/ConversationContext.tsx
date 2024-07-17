import { createContext } from 'react';

interface ConversationContextType {
    nextSentence: () => void;
    switchConversation: (newConversationUrl: string) => void;
}

export const ConversationContext = createContext<ConversationContextType>({
    nextSentence: () => {},
    switchConversation: () => {},
});