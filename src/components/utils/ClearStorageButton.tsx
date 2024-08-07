const ClearStorageButton: React.FC = () => {
    
    const handleButtonClick = async () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div>
           
                <button onClick={handleButtonClick}>
                    clear storage
                </button>
        </div>
    );
    
};

export default ClearStorageButton;
