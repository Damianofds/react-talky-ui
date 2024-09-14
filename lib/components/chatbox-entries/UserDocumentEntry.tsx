import useLoadChatHistoty from "../../hooks/useLoadChatHistory";
import ElaboratingIcon from "../icons/ElaboratingIcon";
import ElaborationFailureIcon from "../icons/ElaborationFailureIcon";
import ElaborationSuccessIcon from "../icons/ElaborationSuccessIcon";
import PdfIcon from "../icons/PDFIcon";
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
                marginRight:'3%',
            }}>
            {/* <figure> */}
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
                <div style={{fontSize: '.6em'}}>
                    <div>{documentName}{' '}<br/></div>
                    {status == UploadStatus.PROCESSING && (
                        <ElaboratingIcon color="grey" />
                    )}
                    {status == UploadStatus.SUCCESS && (
                        <ElaborationSuccessIcon color={themeColor} />
                    )}
                    {status == UploadStatus.FAILURE && (
                        <ElaborationFailureIcon color={"red"} />
                    )}
                </div>
        </div>
    );
};

export default UserDocumentEntry;
