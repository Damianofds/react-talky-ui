import React, { useRef, useState } from 'react';
import Upload from './icons/Upload';
import { ChatItemConfig } from './chat-items/TalkItemsConfig';

interface DocumentUploaderProps {
    inputRetriever: (answer: ChatItemConfig) => void;
    themeColor: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({inputRetriever}) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === 'application/pdf') {
                inputRetriever({id: "init-" + Date.now(), type: 'document-input', isPdf: true, documentUrl: '', documentName: file.name});
            } else if (file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file);
                inputRetriever({id: "init-" + Date.now(), type: 'document-input', isPdf: false, documentUrl: imageUrl, documentName: file.name});
            }
        }
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
        </div>
    );
};

export default DocumentUploader;
