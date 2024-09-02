import React, { useRef } from 'react';
import Upload from './icons/Upload';
import { ChatItemConfig } from './chat-items/TalkItemsConfig';
import useFileUpload from '../hooks/useFileUpload';
import useLocalChat from '../hooks/useLocalChat';

interface DocumentUploaderProps {
    inputRetriever: (answer: ChatItemConfig) => void;
    themeColor: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({inputRetriever}) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { /*uploadStatus,*/ uploadFile } = useFileUpload();
    const {saveBinaryLocalChat} = useLocalChat();


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === 'application/pdf') {
                inputRetriever({
                    id: "init-" + Date.now(),
                    type: 'document-input',
                    isPdf: true,
                    documentUrl: '',
                    documentName: file.name
                });
            } else if (file.type.startsWith('image/')) {
                const documentId = "saved-thumbnail-" + Date.now()
                resizeImage(file, 100, 140, (resizedBase64) => {
                    saveBinaryLocalChat(documentId, resizedBase64);
                    inputRetriever({
                        id: documentId,
                        type: 'document-input',
                        isPdf: false,
                        documentUrl: resizedBase64,
                        documentName: file.name
                    });
                });
            }
            await uploadFile(file);
        };
    }

    const resizeImage = (file: File, width: number, height: number, callback: (resizedBase64: string) => void) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
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
                    padding: '9px',
                    color: 'purple',
                    borderRadius: '25px',
                    outline: 'none',
                    marginRight: '1vw',
                    height: '45px',
                }}
                onClick={handleButtonClick}
                >
                <Upload color='purple' />
            </button>

            <input 
                type="file" 
                accept="application/pdf, image/*" 
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange} 
            />

            {/* <div style={{ marginTop: '10px' }}>
                {uploadStatus.progress > 0 && <p>Upload Progress: {uploadStatus.progress}%</p>}
                {uploadStatus.success && <p>Upload Successful!</p>}
                {uploadStatus.error && <p>Error: {uploadStatus.error}</p>}
            </div> */}
        </div>
    );
};

export default DocumentUploader;
