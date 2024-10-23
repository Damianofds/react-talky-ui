interface BotDropdownEntryProps {
    id: string;
}

const BotDropdownEntry: React.FC<BotDropdownEntryProps> = ({
    
}) => {

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
                content: '▼',
            }}>
            <option>&gt; create new note&lt;</option>
            <option>trip berlin</option>
            <option>office equipment</option>
            <option>party</option>
        </select>
    );
};

export default BotDropdownEntry;
