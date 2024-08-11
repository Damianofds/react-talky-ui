import { useEffect, useState } from 'react';
import { ChatItemConfig } from '../components/chat-items/TalkItemsConfig';

const useFetchTalk = (jsonUrl: string) => {

    const [conversation, setConversation] = useState<ChatItemConfig[]>([]);
    const [talkCurrentItem, setTalkCurrentItem] = useState<ChatItemConfig>();
    const [isLastItem, setLastItem] = useState<boolean>(false);

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

    useEffect(() => {
        let i = 0;
        const intervalId = setInterval(() => {
            if(conversation.length > 0 && i >= conversation.length){
                clearInterval(intervalId);
            }
            else{
                setTalkCurrentItem(conversation[i]);
                if(i == conversation.length-1){
                    setLastItem(true);
                }
                i++;
            }
        }, 100);
    }, [conversation]);    

    return {talkCurrentItem, isLastItem};
};

export default useFetchTalk;