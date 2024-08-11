interface TextItemProps {
    id: string;
    words: string;
}

const InputItem: React.FC<TextItemProps> = ({ words }) => {

    return (<div style={{
                            maxWidth: '50%',
                            marginLeft: '50%',
                            backgroundColor: '#4ea699',
                            borderRadius: '20px',
                            padding: '10px',
                            paddingLeft: '20px'
                        }}
                    key={""+Date.now}>{words}</div>);
}

export default InputItem;
