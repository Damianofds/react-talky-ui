import { createContext } from "react";

interface BotTalkContextType {
    switchBotTalk: (newTalkUrl: string) => void;
}

export const BotTalkContext = createContext<BotTalkContextType>({
    switchBotTalk: () => {},
});
