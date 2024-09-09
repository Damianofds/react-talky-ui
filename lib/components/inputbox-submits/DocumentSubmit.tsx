import React, { useRef } from "react";
import Upload from "../icons/FileUploadIcon";
import { ChatEntryState, UploadStatus } from "../chatbox-entries/ChatEntryState";
import useUserDocumentSubmit from "../../../lib/hooks/useUserDocumentSubmit";
import useLoadChatHistoty from "../../../lib/hooks/useLoadChatHistory";

interface DocumentSubmitProps {
    setChatMessage: (answer: ChatEntryState) => void;
    setBotStatusUpdate: (id: string) => void;
    themeColor: string;
}

const DocumentSubmit: React.FC<DocumentSubmitProps> = ({
    setChatMessage,
    setBotStatusUpdate,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { /*uploadStatus,*/ uploadFile } = useUserDocumentSubmit();
    const { saveBinaryLocalChat } = useLoadChatHistoty();

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const documentId = "saved-thumbnail-" + Date.now();
            if (file.type === "application/pdf") {
                setChatMessage({
                    id: documentId,
                    type: "user-document",
                    isPdf: true,
                    documentUrl: "",
                    documentName: file.name,
                    status: UploadStatus.PROCESSING,
                });
            } else if (file.type.startsWith("image/")) {
                resizeImage(file, 100, 140, resizedBase64 => {
                    saveBinaryLocalChat(documentId, resizedBase64);
                    setChatMessage({
                        id: documentId,
                        type: "user-document",
                        isPdf: false,
                        documentUrl: resizedBase64,
                        documentName: file.name,
                        status: UploadStatus.PROCESSING,
                    });
                });
            }
            await uploadFile(file);
            setBotStatusUpdate(documentId);
        }
    };

    const resizeImage = (
        file: File,
        width: number,
        height: number,
        callback: (resizedBase64: string) => void
    ) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const resizedBase64 = canvas.toDataURL(file.type);
                    callback(resizedBase64);
                }
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <button
                style={{
                    border: `3px solid purple`,
                    padding: "9px",
                    color: "purple",
                    borderRadius: "25px",
                    outline: "none",
                    marginRight: "1vw",
                    height: "45px",
                }}
                onClick={handleButtonClick}>
                <Upload color="purple" />
            </button>

            <input
                type="file"
                accept="application/pdf, image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default DocumentSubmit;