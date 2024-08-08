import { useEffect, useState } from 'react';
import { ChatItemConfig } from '../components/conversation-items/TalkItemsConfig';

const useFetchTalk = (jsonUrl: string) => {

    const [conversation, setConversation] = useState<ChatItemConfig[]>([]);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await fetch(jsonUrl);
                const data = await response.json();

                console.log(`Loading ${data.conversation.length} new conversation items`);
                const processedData = data.conversation.map((item: ChatItemConfig) => {
                    const millisec = Date.now();
                    const rnd = Math.random().toString(36);
                    const uniqueId = `${item.type}-${millisec}-${rnd}`;
                    return {
                        ...item,
                        id: uniqueId,
                    };
                });

                setConversation(processedData);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        fetchConversation();
    }, [jsonUrl]);

    return conversation;
};

export default useFetchTalk;