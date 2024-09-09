import { useContext, useState } from "react";
import { BotTalkContext } from "../BotTalkContext";

interface BotButtonEntryProps {
    id: string;
    conversationUrl: string;
    buttonLabel: string;
    themeColor?: string;
}

const BotButtonEntry: React.FC<BotButtonEntryProps> = ({
    id,
    conversationUrl,
    buttonLabel,
    themeColor = "#4ea699",
}) => {
    const { switchBotTalk: switchConversation } = useContext(BotTalkContext);
    const [isFocused, setIsFocused] = useState(false);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        switchConversation(conversationUrl);
    };

    const handleFocus: React.FocusEventHandler<HTMLButtonElement> = () => {
        setIsFocused(true);
    };

    const handleBlur: React.FocusEventHandler<HTMLButtonElement> = () => {
        setIsFocused(false);
    };

    return (
        <span key={id}>
            <button
                style={{
                    marginTop: "1vh",
                    marginBottom: "1vh",
                    marginRight: "1vw",
                    border: isFocused
                        ? `2px solid ${themeColor}`
                        : "2px solid transparent",
                    transition: "border-color 0.3s ease-in-out",
                }}
                onClick={handleClick}
                onMouseEnter={e =>
                    (e.currentTarget.style.borderColor = themeColor)
                }
                onMouseLeave={e =>
                    (e.currentTarget.style.borderColor = isFocused
                        ? themeColor
                        : "transparent")
                }
                onFocus={handleFocus}
                onBlur={handleBlur}>
                {buttonLabel}
            </button>
        </span>
    );
};

export default BotButtonEntry;