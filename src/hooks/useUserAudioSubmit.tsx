import { useState } from "react";

const DOCUMENT_UPLOAD_API_URL = import.meta.env.TALKY_AUDIO_UPLOAD_API_URL;
const DOCUMENT_UPLOAD_FORM_DATA_KEY = "audio1";

interface UploadStatus {
    progress: number;
    success: boolean;
    error: string | null;
    fileUrl: string | null;
}

const useUserAudioSubmit = () => {
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
        progress: 0,
        success: false,
        error: null,
        fileUrl: null,
    });

    const uploadAudio = async (file: File) => {
        const formData = new FormData();
        formData.append(DOCUMENT_UPLOAD_FORM_DATA_KEY, file);

        try {
            const response = await fetch(DOCUMENT_UPLOAD_API_URL, {
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
