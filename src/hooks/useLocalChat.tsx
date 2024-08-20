const useLocalChat = () => {

    const loadEntireChat = () => {
        const savedComponents = localStorage.getItem('components');
        if(!savedComponents){
            return '';
        }
        const parsedData = JSON.parse(savedComponents);
        const isEmptyArray = Array.isArray(parsedData) && parsedData.length === 0;
        return (isEmptyArray) ? '' : savedComponents;
    }

    return {loadEntireChat}
};

export default useLocalChat;