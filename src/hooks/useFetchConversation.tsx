import { useEffect, useState } from 'react';
import { ConversationItemConfig } from '../components/conversation-items/ConversationalItemsConfig';

const useFetchConversation = (jsonUrl: string) => {

    const [conversation, setConversation] = useState<ConversationItemConfig[]>([]);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await fetch(jsonUrl);
                const data = await response.json();

                console.log(`Loading ${data.conversation.length} new conversation items`);
                const processedData = data.conversation.map((item: ConversationItemConfig) => {
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

export default useFetchConversation;