const useLoadUserChatHistory = () => {
    const savedComponents = localStorage.getItem('components');
    return savedComponents;
};

export default useLoadUserChatHistory;