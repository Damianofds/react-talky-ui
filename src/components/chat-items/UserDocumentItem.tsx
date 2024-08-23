import PdfIcon from "../icons/PDF";

interface UserDocumentItemProps {
    id: string;
    isPdf: boolean;
    documentUrl: string;
    documentName: string;
    themeColor?: string;
  }
  
  const UserDocumentItem: React.FC<UserDocumentItemProps> = ({ id, isPdf, documentUrl, documentName, themeColor='' }) => {
    const document = (documentUrl) ? documentUrl : localStorage.getItem(id) || 'undefined';
    return (
      <div key={id}  style={{
        textAlign: 'right',
        
      }}>
        {documentUrl && !isPdf && (
            <figure>
              <img src={document} alt="Thumbnail" style={{ 
                width: 'auto',
                height: '170px',
                border: `3px solid ${themeColor}`,
              }} />
              <figcaption>{documentName}</figcaption>
            </figure>
        )}
        {isPdf && (
            <figure>
              <div style={{
                height: '170px',
                marginLeft: 'auto',
                overflow: 'hidden'
              }}>
                <PdfIcon width="100" height="200" color="red"/>
              </div>
              <figcaption>{documentName}</figcaption>
            </figure>
        )}
      </div>
    );
  };
  
  export default UserDocumentItem;