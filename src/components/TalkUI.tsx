import { useState } from "react";
import PersonalAIForm from "./PersonalAIForm";
import ConversationStreamer from "../ConversationStreamer";


interface TalkUIProps {
}

const TalkUI: React.FC<TalkUIProps> = ({  }) => {

    const [newMessage, setNewMessage] = useState<string>("");
    const [newMessageType, setNewMessageType] = useState<'question' | 'answer'>('answer');
    
    const handleNewMessage = (msg: string, msgType: 'question' | 'answer') => {
        setNewMessage(msg);
        setNewMessageType(msgType);
    };

    return (
        <>
            <ConversationStreamer jsonUrl='/conversation-personal-ai.json' chatHeight='200px' chatWidth='90vw' aiMessage={newMessage} aiMessageType={newMessageType}/>
            <br/>
            <PersonalAIForm messageHandler={handleNewMessage} />
        </>
    );
};

export default TalkUI;