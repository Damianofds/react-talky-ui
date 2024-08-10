import OpenAI from "openai";
import { useState } from 'react';
const OPENAI_API_KEY = import.meta.env.TALKY_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const useFetchAIConversation = (question: string) => {

    const [aiConversation, setAnswer] = useState('');

    const fetchAIConversation = async () => {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: question }],
            model: "gpt-4o-mini",
            // stream: true,
        });
        // for await (const chunk of stream) {
        //     setAnswer(() => chunk.choices[0]?.delta?.content || "");
        // }
        setAnswer(completion.choices[0].message.content || "Ops, I didn't get it... can you repeat please?");
    };

    return { aiConversation, fetchAIConversation };
};

export default useFetchAIConversation;