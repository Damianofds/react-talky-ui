import { useState } from "react";

const DOCUMENT_UPLOAD_API_URL = import.meta.env.TALKY_DOCUMENT_UPLOAD_API_URL;
const DOCUMENT_UPLOAD_FORM_DATA_KEY = "document";

interface UploadStatus {
    progress: number;
    success: boolean;
    error: string | null;
    fileUrl: string | null;
}

const useFileUpload = () => {
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
        progress: 0,
        success: false,
        error: null,
        fileUrl: null,
    });

    const uploadFile = async (file: File) => {
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

    return { uploadStatus, uploadFile };
};

export default useFileUpload;
