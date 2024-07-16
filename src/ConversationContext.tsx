import { createContext } from 'react';

interface ConversationContextType {
    getCurrentSentenceIndex: () => number;
    nextSentence: () => void;
    saveSentence: (sentence: JSX.Element) => void;
    switchConversation: (newConversationUrl: string) => void;
}

export const ConversationContext = createContext<ConversationContextType>({
    getCurrentSentenceIndex: () => 0,
    nextSentence: () => {},
    saveSentence: () => {},
    switchConversation: () => {},
});