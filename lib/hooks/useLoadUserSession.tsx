const CREATE_BACKEND_SESSION_API_URL = "https://n8n.orose.gold/webhook/users";
export const USER_WITHOUT_SESSION = '{"userId": "anon", "userName": "anon"}'

const useUserSession = () => {
    const loadUserSession = ():{userId?: string; userName?: string} => {
        if(typeof window !== 'undefined'){
            return JSON.parse(localStorage.getItem("user-session") || "{}");
        }
        else{
            return JSON.parse("{}");
        }
    };

    const createBackendUserSession = async () => {
        const response = await fetch(CREATE_BACKEND_SESSION_API_URL, {
            method: "POST",
        });
        if (!response.ok) {
            throw new Error(`Failed to upload: ${response.statusText}`);
        }
        localStorage.setItem("user-session", await response.text());
    };

    const deleteBackendUserSession = async (actionUrl: string) => {
        fetch(actionUrl + loadUserSession().userId, {
            method: "DELETE",
        })
            .then(response => response.json())
            .catch(error =>
                console.error("Error fetching conversations:", error)
            );
        localStorage.clear();
    };

    return {
        loadUserSession,
        createBackendUserSession,
        deleteBackendUserSession,
    };
};

export default useUserSession;
