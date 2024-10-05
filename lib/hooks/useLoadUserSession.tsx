const CREATE_BACKEND_SESSION_API_URL = "https://n8n.orose.gold/webhook/users";
export const USER_WITHOUT_SESSION = '{"userId": "anon", "userName": "anon"}'

const useUserSession = () => {
    const loadUserSession = () => {
        return JSON.parse(localStorage.getItem("user-session") || USER_WITHOUT_SESSION);
    };

    const createBackendUserSession = async () => {
        const response = await fetch(CREATE_BACKEND_SESSION_API_URL, {
            method: "POST",
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to upload: ${response.statusText}`);
        }
        localStorage.setItem("user-session", await response.text());
    };

    return { loadUserSession, createBackendUserSession };
};

export default useUserSession;
