import { useState } from "react";
import useLocalChat from "../../hooks/useLocalChat";

interface ClearStorageButtonProps {
    color: string;
}

const ClearStorageButton: React.FC<ClearStorageButtonProps> = ({color}) => {
    
    const [isHovered, setIsHovered] = useState(false);
    const {clearLocalChat} = useLocalChat();

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
