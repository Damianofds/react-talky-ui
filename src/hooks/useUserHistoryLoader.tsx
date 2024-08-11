const useLoadUserChatHistory = () => {
    const savedComponents = localStorage.getItem('components');
    if(!savedComponents){
        return null;
    }
    const parsedData = JSON.parse(savedComponents);
    const isEmptyArray = Array.isArray(parsedData) && parsedData.length === 0;
    return (isEmptyArray) ? null : savedComponents;
};

export default useLoadUserChatHistory;