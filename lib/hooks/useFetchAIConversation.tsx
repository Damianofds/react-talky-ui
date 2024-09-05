import OpenAI from "openai";
import { useContext, useState } from "react";
import { BotTextEntryState } from "../components/chatbox-entries/ChatEntryState";
import {
    isPlaceholderSettingsValue,
    talkyDelay,
} from "../components/utils/FunctionUtilities";
import { ConfigurationContext } from "../components/ConfigurationContext";

const TOKEN_DELAY = 100;

const useFetchAIConversation = (question: string) => {
    const OPENAI_API_KEY = useContext(ConfigurationContext).openaiKey || '';
    const [aiConversation, setAnswer] = useState<BotTextEntryState>({
        id: "conversation-" + Date.now(),
        text: "",
        type: "bot-text",
        isCompleted: false,
        origin: "gpt-4o-mini",
    });

    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    const fetchAIConversation = async () => {
        if (isPlaceholderSettingsValue(OPENAI_API_KEY)) {
            //TODO: this message should be streamed as well!
            await talkyDelay(TOKEN_DELAY * 20);
            setAnswer(prev => ({
                ...prev,
                text: "I'm sorry but the OpenAI Key is not set for this demo :(",
            }));
        } else {
            const stream = await openai.chat.completions.create({
                messages: [{ role: "system", content: question }],
                model: "gpt-4o-mini",
                stream: true,
            });
            setAnswer({
                id: "conversation-" + Date.now(),
                text: "",
                type: "bot-text",
                isCompleted: false,
                origin: "gpt-4o-mini",
            });
            for await (const chunk of stream) {
                await talkyDelay(TOKEN_DELAY);
                const newToken = chunk.choices[0]?.delta?.content || "";
                setAnswer(prev => ({
                    ...prev,
                    text: prev.text + newToken,
                }));
            }
            setAnswer(prev => ({
                id: "conversation-" + Date.now(),
                text: prev.text,
                type: "bot-text",
                isCompleted: true,
                origin: "gpt-4o-mini",
            }));
        }
    };

    return { aiConversation, fetchAIConversation };
};

export default useFetchAIConversation;
