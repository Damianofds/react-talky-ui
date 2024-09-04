import { ChatEntryState } from "./chat-entries/ChatEntryState";
import { CirclularStack } from "./utils/CircularStack";
import DocumentSubmit from "./DocumentSubmit";
import MessageSubmit from "./MessageSubmit";
import AudioSubmit from "./AudioSubmit";
import { useState } from "react";

interface InputBoxProps {
    setChatMessage: (answer: ChatEntryState) => void;
    setBotStatusUpdate: (id: string) => void;
    conversationRouteKeyword: string;
    qaRouteKeyword: string;
    fontSize?: string;
    themeColor?: string;
    inputBoxHistory: CirclularStack<string>;
}

const InputBox: React.FC<InputBoxProps> = ({
    setChatMessage,
    setBotStatusUpdate,
    conversationRouteKeyword,
    qaRouteKeyword,
    fontSize,
    themeColor = "#000000",
    inputBoxHistory,
}) => {
    const [showBinarySubmitButtons, setShowBinarySubmitButtons] =
        useState(true);

    return (
        <div>
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
                    }></MessageSubmit>
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
        </div>
    );
};

export default InputBox;
