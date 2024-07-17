import { useEffect, useState } from 'react';
import { ConversationItemConfig } from '../components/conversation-items/ConversationalItemsConfig';

const useFetchConversation = (jsonUrl: string) => {
    const [conversation, setConversation] = useState<ConversationItemConfig[]>([]);

    useEffect(() => {
        fetch(jsonUrl)
        .then(response => response.json())
        .then(data => setConversation(data.conversation))
        .catch(error => console.error('Error fetching conversations:', error));    
    }, [jsonUrl]);
    return conversation;
};

export default useFetchConversation;