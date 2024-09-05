import { useContext, useState } from "react";
import { ConfigurationContext } from "../components/ConfigurationContext";

const AUDIO_UPLOAD_FORM_DATA_KEY = "audio1";

interface UploadStatus {
    progress: number;
    success: boolean;
    error: string | null;
    fileUrl: string | null;
}

const useUserAudioSubmit = () => {
    const AUDIO_UPLOAD_API_URL = useContext(ConfigurationContext).audioUploadUrl;
    console.log('AUDIO_UPLOAD_API_URL - ' + AUDIO_UPLOAD_API_URL);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
        progress: 0,
        success: false,
        error: null,
        fileUrl: null,
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
                progress: 100,
                success: true,
                error: null,
                fileUrl: data.fileUrl,
            });
        } catch (error) {
            setUploadStatus({
                progress: 0,
                success: false,
                error: "no error message present",
                fileUrl: null,
            });
        }
    };

    return { uploadStatus, uploadAudio };
};

export default useUserAudioSubmit;
