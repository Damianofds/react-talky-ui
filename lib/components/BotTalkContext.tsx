import { createContext } from "react";

interface BotTalkContextType {
    switchBotTalk: (newTalkUrl: string) => void;
    setInputBoxQuestion: (newQuestion: string) => void;
}

export const BotTalkContext = createContext<BotTalkContextType>({
    switchBotTalk: () => {},
    setInputBoxQuestion: () => {},
});
