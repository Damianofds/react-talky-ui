import OpenAI from "openai";
import { useState } from 'react';
import { StreamItemConfig } from "../components/chat-items/TalkItemsConfig";
const OPENAI_API_KEY = import.meta.env.TALKY_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const useFetchAIConversation = (question: string) => {

    const [aiConversation, setAnswer] = useState<StreamItemConfig>({id: "init-" + Date.now(), text: '', type: 'stream'});

    const fetchAIConversation = async () => {
        const stream = await openai.chat.completions.create({
            messages: [{ role: "system", content: question }],
            model: "gpt-4o-mini",
            stream: true,
        });
        setAnswer({id: "init-" + Date.now(), text: '', type: 'stream'});
        for await (const chunk of stream) {
            await new Promise(resolve => setTimeout(resolve, 100));
            const newToken = chunk.choices[0]?.delta?.content || "";
            setAnswer((prev) => ({
                ...prev,
                text: prev.text + newToken
            }));
        }
    };

    return { aiConversation, fetchAIConversation };
};

export default useFetchAIConversation;