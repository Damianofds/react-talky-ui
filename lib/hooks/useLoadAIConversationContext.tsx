import useLoadChatHistory from "./useLoadChatHistory";

const useLoadAIConversationContext = () => {

    const getLastBotMessages = () => { 
        const { loadLocalChat } = useLoadChatHistory();
        const localChat = JSON.parse(loadLocalChat());
        const conversationContext = localChat
            .filter((e: any) => e.type === "bot-text")
            .slice(-5)
            .map((e: any) => ({ role: "assistant", content: e.text }));
        return conversationContext;
    }

    return { getLastBotMessages };
};

export default useLoadAIConversationContext;