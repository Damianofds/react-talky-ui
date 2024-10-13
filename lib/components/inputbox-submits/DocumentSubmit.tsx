import React, { useContext, useEffect, useRef } from "react";
import Upload from "../icons/FileUploadIcon";
import {
    ChatEntryState,
    UploadStatus,
} from "../chatbox-entries/ChatEntryState";
import useUserDocumentSubmit from "../../../lib/hooks/useUserDocumentSubmit";
import useLoadChatHistory from "../../../lib/hooks/useLoadChatHistory";
import { BotTalkContext } from "../../components/BotTalkContext";
import useUserSession from "../../hooks/useLoadUserSession";

interface DocumentSubmitProps {
    setChatMessage: (answer: ChatEntryState) => void;
    setBotStatusUpdate: (update: {
        entryId: string;
        outcome: UploadStatus;
    }) => void;

    themeColor: string;
}

const DocumentSubmit: React.FC<DocumentSubmitProps> = ({
    setChatMessage,
    setBotStatusUpdate,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { uploadStatus, uploadFile } = useUserDocumentSubmit();
    const { saveBinaryLocalChat } = useLoadChatHistory();
    const { switchBotTalk: switchConversation } = useContext(BotTalkContext);
    const { loadUserSession } = useUserSession();

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

            const userSession = loadUserSession();
            const uploadResult = await uploadFile(file, userSession?.userId);

            const outcome =
                uploadResult.httpStatusCode &&
                uploadResult.httpStatusCode >= 200 &&
                uploadResult.httpStatusCode < 300
                    ? UploadStatus.SUCCESS
                    : UploadStatus.FAILURE;
            
            if(outcome == UploadStatus.SUCCESS){
                switchConversation('https://n8n.orose.gold/webhook/4a0882d1-da22-402c-886e-729a01cf0ccd/users/' + userSession?.userId + '/documents/' + uploadResult.message + '/formats/talk1');
            }

            setBotStatusUpdate({ entryId: documentId, outcome: outcome });
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

    useEffect(() => {
        if (uploadStatus.httpStatusCode) {
            setChatMessage({
                id: Math.random + "",
                type: "bot-text-streaming",
                text: uploadStatus.message || "",
                isCompleted: true,
                origin: "",
            });
        }
    }, [uploadStatus]);

    return (
        <div>
            <button
                style={{
                    border: `3px solid blue`,
                    padding: "9px",
                    borderRadius: "25px",
                    outline: "none",
                    marginRight: "1vw",
                    height: "45px",
                }}
                onClick={handleButtonClick}>
                <Upload color="blue" />
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
