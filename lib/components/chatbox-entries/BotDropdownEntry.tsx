import { useContext } from "react";
import { BotTalkContext } from "../BotTalkContext";

interface BotDropdownEntryProps {
    id: string;
}

export const NEW_NOTE_PLACEHOLDER = "NEW_NOTE_PLACEHOLDER";

const BotDropdownEntry: React.FC<BotDropdownEntryProps> = ({
    
}) => {
    const { setInputBoxQuestion: setInputBoxQuestion } = useContext(BotTalkContext);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const question = (event.target.value.includes("create new note")) ? NEW_NOTE_PLACEHOLDER : event.target.value;
        setInputBoxQuestion(question);
    };

    return (
        <select
            style={{
                fontFamily: "inherit",
                cursor: "pointer",
                borderRadius: "5px",
                padding: "0.6em 1.2em",
                fontSize: "1em",
                fontWeight: "500",
                marginTop: "1vh",
                marginBottom: "1vh",
                marginRight: "1vw",
                border: `2px solid gray`,
                transition: "border-color 0.3s ease-in-out",
            }}
            onChange={handleChange}>
            <option>🆕 create new note</option>
            <option>trip berlin</option>
            <option>office equipment</option>
            <option>party</option>
        </select>
    );
};

export default BotDropdownEntry;
