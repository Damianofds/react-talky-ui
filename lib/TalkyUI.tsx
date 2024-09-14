import { useState } from "react";
import InputBox from "./components/InputBox";
import ChatBox from "./components/ChatBox";
import {
    ChatEntryState,
    UploadStatus,
} from "./components/chatbox-entries/ChatEntryState";
import {
    CirclularStack,
    createCircularStack,
    push,
    get,
} from "./components/utils/CircularStack";
import { ConfigurationContext } from "./components/ConfigurationContext";

interface TalkUIProps {
    initTalkURL: string;
    fontSize?: string;
    themeColor?: string;
    backendConfiguration: {
        openaiKey?: string;
        qaUrl?: string;
        audioUploadUrl?: string;
        documentUploadurl?: string;
    };
}

const TalkyUI: React.FC<TalkUIProps> = ({
    initTalkURL,
    fontSize = "20px",
    themeColor = "#4ea699",
    backendConfiguration,
}) => {
    const [chatMessage, setChatMessage] = useState<ChatEntryState>();
    const [botStatusUpdate, setBotStatusUpdate] = useState<{
        entryId: string;
        outcome: UploadStatus;
    }>();
    const [chatMessageUserHistory, setChatMessageUserHistory] = useState<
        CirclularStack<string>
    >(createCircularStack(10));

    if (chatMessage?.type == "user-text") {
        if (get(chatMessageUserHistory, 0) != chatMessage.text) {
            setChatMessageUserHistory(
                push(chatMessageUserHistory, chatMessage.text)
            );
        }
    }

    return (
        <>
            <ConfigurationContext.Provider
                value={{
                    openaiKey: backendConfiguration.openaiKey,
                    qaUrl: backendConfiguration.qaUrl,
                    audioUploadUrl: backendConfiguration.audioUploadUrl,
                    documentUploadurl: backendConfiguration.documentUploadurl,
                }}>
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
            </ConfigurationContext.Provider>
        </>
    );
};

export default TalkyUI;
