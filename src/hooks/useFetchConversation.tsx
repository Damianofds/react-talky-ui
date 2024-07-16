import { useEffect, useState } from 'react';

interface Sentence {
    type: "statement" | "question" | "radio" | "personal-ai";
    text: string;
    yesButton: {
        label: string,
        conversationUrl: string
    };
    noButton: {
        label: string,
        conversationUrl: string
    };
    submitButtonLabel: string;
}

const useFetchConversation = (jsonUrl: string) => {
    const [conversation, setConversation] = useState<Sentence[]>([]);

    useEffect(() => {
        fetch(jsonUrl)
        .then(response => response.json())
        .then(data => setConversation(data.conversation))
        .catch(error => console.error('Error fetching conversations:', error));    
    }, [jsonUrl]);

    return conversation;
};

export default useFetchConversation;