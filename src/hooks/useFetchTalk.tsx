import { useEffect, useState } from 'react';
import { ChatItemConfig, StreamItemConfig } from '../components/chat-items/TalkItemsConfig';

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
        if(conversation && conversation.length >= 1){
            let itemCounter = 0;
            let tokenCounter = 0;
            const intervalId = setInterval(() => {
                if(conversation.length > 0 && itemCounter >= conversation.length){
                    clearInterval(intervalId);
                }
                else{
                    if((conversation[itemCounter] as ChatItemConfig).type == 'stream'){
                        const streamItem = (conversation[itemCounter] as StreamItemConfig);
                        const tokens = streamItem.text.split(" ");
                        if(tokenCounter <= tokens.length-1){
                            setTalkCurrentItem({id: conversation[itemCounter].id, text: tokens.slice(0, tokenCounter).join(' '), type: 'stream', isCompleted: false});
                            tokenCounter++;
                        } else {
                            setTalkCurrentItem({id: conversation[itemCounter].id, text: tokens.join(' '), type: 'stream', isCompleted: true});
                            tokenCounter=0;
                            itemCounter++;
                        }
                    }
                    else{
                        setTalkCurrentItem(conversation[itemCounter]);
                        itemCounter++;
                    }
                    if(itemCounter == conversation.length){
                        setLastItem(true);
                    }
                }
            }, 100);
        }
    }, [conversation]);    

    return {talkCurrentItem, isLastItem};
};

export default useFetchTalk;