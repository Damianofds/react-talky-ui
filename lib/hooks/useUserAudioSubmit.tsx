import { useContext, useState } from "react";
import { ConfigurationContext } from "../components/ConfigurationContext";
import { UploadStatus } from "./utils/UploadStatus";

const AUDIO_UPLOAD_FORM_DATA_KEY = "audio1";

const useUserAudioSubmit = () => {
    const AUDIO_UPLOAD_API_URL = useContext(ConfigurationContext).audioUploadUrl || '';
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
        statusCode: 'initialized',
        httpStatusCode: null,
        message: ""
    });

    const uploadAudio = async (file: File) => {
        const formData = new FormData();
        formData.append(AUDIO_UPLOAD_FORM_DATA_KEY, file);

        try {
            const response = await fetch(AUDIO_UPLOAD_API_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to upload: ${response.statusText}`);
            }

            const data = await response.json();
            setUploadStatus({
                statusCode: data.statusCode,
                httpStatusCode: null,
                message: data.statusText
            });
        } catch (error) {
            setUploadStatus({
                statusCode: 'client-error',
                httpStatusCode: null,
                message: ""+error
            });
        }
    };

    return { uploadStatus, uploadAudio };
};

export default useUserAudioSubmit;
