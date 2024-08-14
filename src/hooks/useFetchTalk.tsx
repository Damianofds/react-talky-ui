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
            let i = 0;
            let j = 0;
            const intervalId = setInterval(() => {
                if(conversation.length > 0 && i >= conversation.length){
                    clearInterval(intervalId);
                }
                else{
                    if((conversation[i] as ChatItemConfig).type == 'stream'){
                        const streamItem = (conversation[i] as StreamItemConfig);
                        const tokens = streamItem.text.split(" ");
                        if(j <= tokens.length-1){
                            setTalkCurrentItem({id: conversation[i].id, text: tokens.slice(0, j).join(' '), type: 'stream', isCompleted: false});
                            j++;
                        } else {
                            setTalkCurrentItem({id: conversation[i].id, text: tokens.join(' '), type: 'stream', isCompleted: true});
                            j=0;
                            i++;
                        }
                    }
                    else{
                        setTalkCurrentItem(conversation[i]);
                        i++;
                    }
                    if(i == conversation.length){
                        setLastItem(true);
                    }
                }
            }, 100);
        }
    }, [conversation]);    

    return {talkCurrentItem, isLastItem};
};

export default useFetchTalk;