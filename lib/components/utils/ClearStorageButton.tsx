import { useState } from "react";
import useLoadChatHistory from "../../../lib/hooks/useLoadChatHistory";

interface ClearStorageButtonProps {
    color: string;
}

const ClearStorageButton: React.FC<ClearStorageButtonProps> = ({color}) => {
    
    const [isHovered, setIsHovered] = useState(false);
    const {clearLocalChat} = useLoadChatHistory();

    const handleButtonClick = async () => {
        clearLocalChat();
        window.location.reload();
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div onClick={handleButtonClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                fontWeight: isHovered ? 600 : 400,
                color: color,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline',
                width: '400px',
            }}>
            clear storage
        </div>
    );
    
};

export default ClearStorageButton;
