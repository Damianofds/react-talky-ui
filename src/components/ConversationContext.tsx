import { createContext } from 'react';

interface ConversationContextType {
    switchConversation: (newConversationUrl: string) => void;
}

export const ConversationContext = createContext<ConversationContextType>({
    switchConversation: () => {},
});