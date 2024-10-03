import { useContext } from "react";
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

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        switchConversation(conversationUrl);
    };

    return (
            <button
                style={{
                    fontFamily: "inherit",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "25px",
                    padding: "0.6em 1.2em",
                    fontSize: "1em",
                    fontWeight: "500",
                    marginTop: "1vh",
                    marginBottom: "1vh",
                    marginRight: "1vw",
                    border: `2px solid gray`,
                    transition: "border-color 0.3s ease-in-out",
                }}
                onClick={handleClick}
                onMouseEnter={e =>
                    (e.currentTarget.style.borderColor = themeColor)
                }
                onMouseLeave={e =>
                    (e.currentTarget.style.borderColor = "gray")
                }>
                {buttonLabel}
            </button>
    );
};

export default BotButtonEntry;
