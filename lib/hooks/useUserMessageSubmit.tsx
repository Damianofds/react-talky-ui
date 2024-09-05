import { useState } from "react";
import useFetchAIAnswer from "./useFetchAIAnswer";
import useFetchAIConversation from "./useFetchAIConversation";

const useRouteInputBoxValue = (inputBoxValue: string) => {
    const { aiConversation, fetchAIConversation } =
        useFetchAIConversation(inputBoxValue);
    const { aiAnswer, fetchAIAnswer } = useFetchAIAnswer(inputBoxValue);
    const [currentChatRoute, setCurrentChatRoute] = useState<
        "conversation" | "qa"
    >("qa");

    const keywordRouting = (
        text: string,
        conversationKeyword: string,
        qaKeyword: string
    ) => {
        const isKeywordPresent = (text: string, conversationKeyword: string) =>
            new RegExp(`\\b${conversationKeyword}\\b`, "i").test(text);
        if (isKeywordPresent(text, conversationKeyword)) {
            fetchAIConversation();
            setCurrentChatRoute("conversation");
        } else if (isKeywordPresent(text, qaKeyword)) {
            fetchAIAnswer();
            setCurrentChatRoute("qa");
        } else {
            const currentRouter =
                currentChatRoute == "conversation"
                    ? fetchAIConversation
                    : fetchAIAnswer;
            currentRouter();
        }
    };

    const answer =
        currentChatRoute == "conversation" ? aiConversation : aiAnswer;
    return { answer, keywordRouting };
};

export default useRouteInputBoxValue;
