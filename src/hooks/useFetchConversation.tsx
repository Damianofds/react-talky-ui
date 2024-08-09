import OpenAI from "openai";
import { useState } from 'react';
// Key Name react-talky-ui-dev
const openai = new OpenAI({ apiKey: 'remove this if you set it in env', dangerouslyAllowBrowser: true });

const useFetchAnswer = (question: string) => {

    const [answer, setAnswer] = useState('');

    const fetchData = async () => {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: question }],
            model: "gpt-4o-mini",
        });

        // console.log("V-----V");
        // console.log(completion);
        setAnswer(completion.choices[0].message.content || "Ops, I didn't get it... can you repeat please?");
    };

    return { answer, fetchData };
};

export default useFetchAnswer;