interface TextItemProps {
    id: string;
    words: string;
    themeColor?: string
}

const InputItem: React.FC<TextItemProps> = ({ words, themeColor }) => {

    return (<div style={{
                            maxWidth: '50%',
                            marginLeft: '50%',
                            backgroundColor: themeColor || '#4ea699',
                            borderRadius: '20px',
                            padding: '10px',
                            paddingLeft: '20px'
                        }}
                    key={""+Date.now}>{words}</div>);
}

export default InputItem;
