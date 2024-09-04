import { useEffect, useState } from "react";
import {
    BotTextEntryState,
    ChatEntryState,
} from "../components/chat-entries/ChatEntryState";

const useBotTalk = (jsonUrl: string) => {
    const [conversation, setConversation] = useState<ChatEntryState[]>([]);
    const [talkCurrentItem, setTalkCurrentItem] = useState<ChatEntryState>();
    const [isLastItem, setLastItem] = useState<boolean>(false);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await fetch(jsonUrl);
                const data = await response.json();
                const processedData = data.conversation.map(
                    (item: ChatEntryState) => {
                        const millisec = Date.now();
                        const rnd = Math.random().toString(36);
                        const uniqueId = `${item.type}-${millisec}-${rnd}`;
                        return {
                            ...item,
                            id: uniqueId,
                        };
                    }
                );

                setConversation(processedData);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };

        fetchConversation();
    }, [jsonUrl]);

    useEffect(() => {
        if (conversation && conversation.length >= 1) {
            let itemCounter = 0;
            let tokenCounter = 0;
            const intervalId = setInterval(() => {
                if (
                    conversation.length > 0 &&
                    itemCounter >= conversation.length
                ) {
                    clearInterval(intervalId);
                } else {
                    if (
                        (conversation[itemCounter] as ChatEntryState).type ==
                        "bot-text"
                    ) {
                        const streamItem = conversation[
                            itemCounter
                        ] as BotTextEntryState;
                        const tokens = streamItem.text.split(" ");
                        if (tokenCounter <= tokens.length - 1) {
                            setTalkCurrentItem({
                                id: conversation[itemCounter].id,
                                text: tokens.slice(0, tokenCounter).join(" "),
                                type: "bot-text",
                                isCompleted: false,
                                origin: "static",
                            });
                            tokenCounter++;
                        } else {
                            setTalkCurrentItem({
                                id: conversation[itemCounter].id,
                                text: tokens.join(" "),
                                type: "bot-text",
                                isCompleted: true,
                                origin: "static",
                            });
                            tokenCounter = 0;
                            itemCounter++;
                        }
                    } else {
                        setTalkCurrentItem(conversation[itemCounter]);
                        itemCounter++;
                    }
                    if (itemCounter == conversation.length) {
                        setLastItem(true);
                    }
                }
            }, 100);
        }
    }, [conversation]);

    return { talkCurrentItem, isLastItem };
};

export default useBotTalk;
