import { ChatEntryState, UploadStatus } from "./chatbox-entries/ChatEntryState";
import { CirclularStack } from "./utils/CircularStack";
import DocumentSubmit from "./inputbox-submits/DocumentSubmit";
import MessageSubmit from "./inputbox-submits/MessageSubmit";
import AudioSubmit from "./inputbox-submits/AudioSubmit";
import { useState } from "react";

interface InputBoxProps {
    setChatMessage: (answer: ChatEntryState) => void;
    setBotStatusUpdate: (update: {
        entryId: string;
        outcome: UploadStatus;
    }) => void;

    conversationRouteKeyword: string;
    qaRouteKeyword: string;
    fontSize?: string;
    themeColor?: string;
    inputBoxHistory: CirclularStack<string>;
    questionFromUI: string;
}

const InputBox: React.FC<InputBoxProps> = ({
    setChatMessage,
    setBotStatusUpdate,
    conversationRouteKeyword,
    qaRouteKeyword,
    fontSize,
    themeColor = "#000000",
    inputBoxHistory,
    questionFromUI,
}) => {
    const [showBinarySubmitButtons, setShowBinarySubmitButtons] =
        useState(true);

    return (
        <div style={{ display: "flex", position: "relative" }}>
            <MessageSubmit
                inputRetriever={setChatMessage}
                inputBoxHistory={inputBoxHistory}
                conversationRouteKeyword={conversationRouteKeyword}
                qaRouteKeyword={qaRouteKeyword}
                fontSize={fontSize}
                themeColor={themeColor}
                showBinarySubmitButtons={
                    setShowBinarySubmitButtons
                }
                questionFromUI={questionFromUI}></MessageSubmit>
            {showBinarySubmitButtons && (
                <>
                    <AudioSubmit
                        setChatMessage={setChatMessage}
                        setBotStatusUpdate={setBotStatusUpdate}
                        themeColor={themeColor}
                    />
                    <DocumentSubmit
                        setChatMessage={setChatMessage}
                        setBotStatusUpdate={setBotStatusUpdate}
                        themeColor={themeColor}
                    />
                </>
            )}
        </div>
    );
};

export default InputBox;
