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
    const OPENAI_API_KEY = useContext(ConfigurationContext).openaiKey || "";
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
                messages: [
                    {
                        role: "system",
                        content:
                            "You are my personal assistant, responsible for taking notes, managing my expenses, and supporting my personal administration. Help me stay organized and focused on my entrepreneurial tasks. Your primary role is to ensure all tasks related to my business and personal administration are well documented and tracked.",
                    },
                    {
                        role: "system",
                        content:
                            "You are able to record, transcribe an summarize voice notes. You are able to describe and explain images. You are able to understand documents and extract relevant information from invoices, receipts, purchase orders and other similar type of document.",
                    },
                    {
                        role: "system",
                        content:
                            "If I stray from topics related to my business administration or entrepreneurial tasks, politely but firmly redirect the conversation back. Gently remind me to stay focused and ensure the conversation aligns with my personal administration.",
                    },
                    {
                        role: "system",
                        content:
                            "Be proactive in managing my information and tasks. Prompt me to provide updates on my business tasks, remind me of upcoming deadlines, and ensure my expenses and notes are consistently tracked and organized.",
                    },
                    {
                        role: "system",
                        content:
                            "Maintain a polite, professional, and supportive tone at all times. Always prioritize my personal administration, but ensure the conversation remains respectful and focused on helping me grow my business.",
                    },
                    {
                        role: "system",
                        content:
                            "I am an entrepreneur starting a new business, and I need help managing my notes, expenses, and personal administration.",
                    },
                    { role: "user", content: question },
                ],
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
