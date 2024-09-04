import { useState } from "react";
import InputBox from "./components/InputBox";
import ChatBox from "./components/ChatBox";
import { ChatItemConfig } from "./components/chat-items/ChatItemConfig";
import {
    CirclularStack,
    createCircularStack,
    push,
    get,
} from "./components/utils/CircularStack";

interface TalkUIProps {
    initTalkURL: string;
    fontSize?: string;
    themeColor?: string;
}

const TalkyUI: React.FC<TalkUIProps> = ({
    initTalkURL,
    fontSize = "20px",
    themeColor = "#4ea699",
}) => {
    const [chatMessage, setChatMessage] = useState<ChatItemConfig>();
    const [botStatusUpdate, setBotStatusUpdate] = useState<string>();
    const [chatMessageUserHistory, setChatMessageUserHistory] = useState<
        CirclularStack<string>
    >(createCircularStack(10));

    if (chatMessage?.type == "text-input") {
        if (get(chatMessageUserHistory, 0) != chatMessage.text) {
            setChatMessageUserHistory(
                push(chatMessageUserHistory, chatMessage.text)
            );
        }
    }

    return (
        <>
            <ChatBox
                initTalkURL={initTalkURL}
                chatMessage={chatMessage}
                themeColor={themeColor}
                fontSize={fontSize}
                updateStatus={botStatusUpdate}
            />
            <InputBox
                setChatMessage={setChatMessage}
                setBotStatusUpdate={setBotStatusUpdate}
                inputBoxHistory={chatMessageUserHistory}
                conversationRouteKeyword="conversation"
                qaRouteKeyword="embeddings"
                themeColor={themeColor}
                fontSize={fontSize}
            />
            <br />
        </>
    );
};

export default TalkyUI;
