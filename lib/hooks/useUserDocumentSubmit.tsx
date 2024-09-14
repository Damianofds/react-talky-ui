import { useContext, useState } from "react";
import { ConfigurationContext } from "../components/ConfigurationContext";
import { UploadStatus } from "./utils/UploadStatus";

const DOCUMENT_UPLOAD_FORM_DATA_KEY = "document";

const useUserDocumentSubmit = () => {
    const DOCUMENT_UPLOAD_API_URL = useContext(ConfigurationContext).documentUploadurl || '';
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
        httpStatusCode: null,
        message: "Document upload request initialized"
    });

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append(DOCUMENT_UPLOAD_FORM_DATA_KEY, file);
        try{
            const response = await fetch(DOCUMENT_UPLOAD_API_URL, {
                method: "POST",
                body: formData,
            });
            const responseText = await response.text();
            if (!response.ok) {
                setUploadStatus({
                    httpStatusCode: response.status,
                    message: responseText
                });
            }
            setUploadStatus({
                httpStatusCode: response.status,
                message: responseText
            });
        } catch(error){

        }
    };

    return { uploadStatus, uploadFile };
};

export default useUserDocumentSubmit;
