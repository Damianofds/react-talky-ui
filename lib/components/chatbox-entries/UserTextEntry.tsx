interface UserTextEntryProps {
    id: string;
    words: string;
    themeColor?: string
}

const UserTextEntry: React.FC<UserTextEntryProps> = ({ words, themeColor }) => {
    return (
        <div key={""+Date.now}
            style={{
            // textAlign: 'right'
        }}>
            <div
                style={{
                            textAlign: 'left',
                            marginLeft: '35%',
                            marginRight:'3%',
                            backgroundColor: themeColor || '#4ea699',
                            borderRadius: '20px',
                            padding: '10px',
                            paddingLeft: '20px'
                        }}
            >
                {words}
            </div>
        </div>
    );
}

export default UserTextEntry;
