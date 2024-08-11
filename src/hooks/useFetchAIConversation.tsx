import OpenAI from "openai";
import { useState } from 'react';
const OPENAI_API_KEY = import.meta.env.TALKY_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const useFetchAIConversation = (question: string) => {

    const [aiConversation, setAnswer] = useState('');

    const fetchAIConversation = async () => {
        const stream = await openai.chat.completions.create({
            messages: [{ role: "system", content: question }],
            model: "gpt-4o-mini",
            stream: true,
        });
        setAnswer('');
        for await (const chunk of stream) {
            await new Promise(resolve => setTimeout(resolve, 100));
            const newToken = chunk.choices[0]?.delta?.content || "";
            console.log(newToken);
            setAnswer(prev => prev + newToken);
        }
    };

    return { aiConversation, fetchAIConversation };
};

export default useFetchAIConversation;