const CREATE_BACKEND_SESSION_API_URL = "https://n8n.orose.gold/webhook/users";
const GET_BACKEND_SESSION_API_URL = "https://n8n.orose.gold/webhook/71257123-d4c5-462c-a85b-59ccc9d93c13/c/users";

export const USER_WITHOUT_SESSION = '{"userId": "anon", "userName": "anon"}'

type UserSession = {userId: string; userName: string;} | undefined

const useUserSession = () => {

    const loadUserSession = ():UserSession | null => {
        const userSessionAsString = localStorage.getItem("user-session")
        if(userSessionAsString && userSessionAsString != ''){
            return JSON.parse(userSessionAsString);
        }
        return null;
    };

    const validateUserSession = async (sessionId: string):Promise<boolean> => {
        const response = await fetch(
            GET_BACKEND_SESSION_API_URL + "/" + sessionId
        )
        if (!response.ok) {
            console.log("session invalid")
            localStorage.clear();
            return false;
        }
        return true;
    };

    const createUserSession = async () => {
        const response = await fetch(CREATE_BACKEND_SESSION_API_URL, {
            method: "POST",
        });
        if (!response.ok) {
            throw new Error(`Failed to upload: ${response.statusText}`);
        }
        const userSession = await response.text();
        localStorage.setItem("user-session", userSession);
        return userSession;
    };

    const deleteUserSession = async (actionUrl: string) => {
        await fetch(actionUrl + (await loadUserSession())?.userId, {
            method: "DELETE",
        })
            .catch(error =>
                console.error("Error fetching conversations:", error)
            );
        localStorage.clear();
    };

    return {
        loadUserSession,
        validateUserSession,
        createUserSession,
        deleteUserSession,
    };
};

export default useUserSession;
