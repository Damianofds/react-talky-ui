interface UserDocumentItemProps {
    id: string;
    isPdf: boolean;
    documentUrl: string;
    documentName: string;
    themeColor?: string;
  }
  
  const UserDocumentItem: React.FC<UserDocumentItemProps> = ({ id, isPdf, documentUrl, documentName, themeColor='' }) => {
  
    return (
      <div key={id}  style={{
        textAlign: 'right',
        
      }}>
        {documentUrl && !isPdf && (
                <figure>
                    <img src={documentUrl} alt="Thumbnail" style={{ width: '200px', height: 'auto', border: `3px solid ${themeColor}`, }} />
                    <figcaption>{documentName}</figcaption>
                </figure>
        )}
        {isPdf && (
            <p style={{
                height: 'auto', 
                border: `3px solid ${themeColor}`,
                width: '200px',
                marginLeft: 'auto',
                overflow: 'hidden'
            }}>
                <p>{documentName}</p>
            </p>
        )}
        <span>{documentName}</span>
      </div>
    );
  };
  
  export default UserDocumentItem;