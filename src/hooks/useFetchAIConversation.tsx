import OpenAI from "openai";
import { useState } from 'react';
import { StreamItemConfig } from "../components/chat-items/TalkItemsConfig";
const OPENAI_API_KEY = import.meta.env.TALKY_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const useFetchAIConversation = (question: string) => {

    const [aiConversation, setAnswer] = useState<StreamItemConfig>({
        id: "stream-" + Date.now(),
        text: '', type: 'stream',
        isCompleted: false,
        origin: 'gpt-4o-mini'
    });

    const fetchAIConversation = async () => {
        const stream = await openai.chat.completions.create({
            messages: [{ role: "system", content: question }],
            model: "gpt-4o-mini",
            stream: true,
        });
        setAnswer({id: "stream-" + Date.now(),
            text: '',
            type: 'stream',
            isCompleted: false,
            origin:'gpt-4o-mini',
        });
        for await (const chunk of stream) {
            await new Promise(resolve => setTimeout(resolve, 100));
            const newToken = chunk.choices[0]?.delta?.content || "";
            setAnswer((prev) => ({
                ...prev,
                text: prev.text + newToken
            }));
        }
        setAnswer(prev => ({id: "stream-" + Date.now(),
            text: prev.text,
            type: 'stream',
            isCompleted: true,
            origin:'gpt-4o-mini',
        }));
    };

    return { aiConversation, fetchAIConversation };
};

export default useFetchAIConversation;