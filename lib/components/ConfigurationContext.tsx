import { createContext } from "react";

interface ConfigurationContextType {
    openaiKey?: string;
    qaUrl?: string;
    audioUploadUrl?: string;
    documentUploadurl?: string;
}

export const ConfigurationContext = createContext<ConfigurationContextType>({
    openaiKey: "<Add your Open API Key here>",
    qaUrl: "<The url for QA backend>",
    audioUploadUrl: "<The url for audio upload>",
    documentUploadurl: "<The url for audio upload>",
});
