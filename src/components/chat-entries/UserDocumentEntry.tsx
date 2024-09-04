import useLoadChatHistoty from "../../hooks/useLoadChatHistory";
import ElaboratingIcon from "../icons/ElaboratingIcon";
import ElaborationSuccessIcon from "../icons/ElaborationSuccessIcon";
import PdfIcon from "../icons/PDF";
import { UploadStatus } from "./ChatEntryState";

interface UserDocumentEntryProps {
    id: string;
    isPdf: boolean;
    documentUrl: string;
    documentName: string;
    themeColor?: string;
    status: UploadStatus;
}

const UserDocumentEntry: React.FC<UserDocumentEntryProps> = ({
    id,
    isPdf,
    documentUrl,
    documentName,
    themeColor = "",
    status,
}) => {
    const { getLocalChatEntry } = useLoadChatHistoty();
    const document = documentUrl
        ? documentUrl
        : getLocalChatEntry(id) || "undefined";

    return (
        <div
            key={id}
            style={{
                textAlign: "right",
            }}>
            <figure>
                {!isPdf && (
                    <img
                        src={document}
                        alt="Document thumbnail"
                        data-testid="document-thumbnail"
                        style={{
                            width: "auto",
                            height: "170px",
                            border: `3px solid ${themeColor}`,
                            borderRadius: "30px",
                        }}
                    />
                )}
                {isPdf && (
                    <div
                        style={{
                            height: "170px",
                            marginLeft: "auto",
                            overflow: "hidden",
                        }}>
                        <PdfIcon width="100" height="200" color="red" />
                    </div>
                )}
                <figcaption>
                    {documentName}&nbsp;&nbsp;&nbsp;
                    {status == UploadStatus.PROCESSING && (
                        <ElaboratingIcon color="purple" />
                    )}
                    {status == UploadStatus.SUCCESS && (
                        <ElaborationSuccessIcon color="purple" />
                    )}
                </figcaption>
            </figure>
        </div>
    );
};

export default UserDocumentEntry;
