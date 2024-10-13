import { useContext, useEffect, useState } from "react";
import { BotTextEntryState } from "../components/chatbox-entries/ChatEntryState";
import { isPlaceholderSettingsValue } from "../components/utils/FunctionUtilities";
import { ConfigurationContext } from '../components/ConfigurationContext';
import useUserSession from "../hooks/useLoadUserSession";

const useFetchAIAnswer = (question: string) => {
    const API_URL = useContext(ConfigurationContext).qaUrl || '';
    const [aiAnswer, setAnswer] = useState<BotTextEntryState>({
        id: "qa-" + Date.now(),
        text: "",
        type: "bot-text",
        isCompleted: false,
        origin: "internal-qa",
    });
    const [text, setText] = useState("");
    const { loadUserSession } = useUserSession();

    const fetchAIAnswer = async () => {
        if (isPlaceholderSettingsValue(API_URL)) {
            //TODO: this message should be streamed as well!
            setAnswer(prev => ({
                ...prev,
                text: "I'm sorry but the Q&A backend service is not set for this demo :(",
            }));
        } else {
            fetch(API_URL.replace(":user-id", loadUserSession()?.userId || "anon"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: question }),
            })
                .then(response => response.json())
                .then(data => setText(data.response.text))
                .catch(error =>
                    console.error("Error fetching conversations:", error)
                );
        }
    };

    useEffect(() => {
        setAnswer({
            id: "qa-" + Date.now(),
            text: "",
            type: "bot-text",
            isCompleted: false,
            origin: "internal-qa",
        });
        const textArray = text != "" ? text.split(" ") : [];
        let counter = -1;
        if (textArray.length > 0) {
            const intervalId = setInterval(() => {
                if (counter >= textArray.length) {
                    clearInterval(intervalId);
                    setAnswer(prev => ({
                        id: "qa-" + Date.now(),
                        text: prev.text,
                        type: "bot-text",
                        isCompleted: true,
                        origin: "internal-qa",
                    }));
                } else {
                    setAnswer(prev => ({
                        ...prev,
                        text: prev.text + " " + (textArray[counter] || ""),
                    }));
                    counter++;
                }
            }, 100);
        }
    }, [text]);

    return { aiAnswer, fetchAIAnswer };
};

export default useFetchAIAnswer;
