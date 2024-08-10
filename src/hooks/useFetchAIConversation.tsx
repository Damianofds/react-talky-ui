import OpenAI from "openai";
import { useState } from 'react';
const openai = new OpenAI({ dangerouslyAllowBrowser: true });

const useFetchAIConversation = (question: string) => {

    const [aiConversation, setAnswer] = useState('');

    const fetchAIConversation = async () => {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: question }],
            model: "gpt-4o-mini",
        });
        setAnswer(completion.choices[0].message.content || "Ops, I didn't get it... can you repeat please?");
    };

    return { aiConversation, fetchAIConversation };
};

export default useFetchAIConversation;