import { ChatItemConfig } from "./chat-items/ChatItemConfig";
import { CirclularStack } from "./utils/CircularStack";
import DocumentSubmit from "./DocumentSubmit";
import MessageSubmit from "./MessageSubmit";
import AudioSubmit from "./AudioSubmit";
import { useState } from "react";

interface InputBoxProps {
    inputRetriever: (answer: ChatItemConfig) => void;
    successSetter: (id: string) => void;
    conversationRouteKeyword: string;
    qaRouteKeyword: string;
    fontSize?: string;
    themeColor?: string;
    inputBoxHistory: CirclularStack<string>;
}

const InputBox: React.FC<InputBoxProps> = ({
    inputRetriever,
    successSetter,
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
                    inputRetriever={inputRetriever}
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
                            inputRetriever={inputRetriever}
                            successSetter={successSetter}
                            themeColor={themeColor}
                        />
                        <DocumentSubmit
                            inputRetriever={inputRetriever}
                            successSetter={successSetter}
                            themeColor={themeColor}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default InputBox;
