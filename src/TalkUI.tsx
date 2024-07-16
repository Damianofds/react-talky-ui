import { useState } from "react";
import TalkInput from "./components/InputBox";
import ConversationBox from "./components/ConversationBox";


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
            <ConversationBox jsonUrl='/conversation-personal-ai.json' chatHeight='200px' chatWidth='90vw' aiMessage={newMessage} aiMessageType={newMessageType}/>
            <br/>
            <TalkInput messageHandler={handleNewMessage} />
        </>
    );
};

export default TalkUI;