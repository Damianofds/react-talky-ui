interface StreamItemProps {
    id: string;
    words: string;
}

const StreamItem: React.FC<StreamItemProps> = ({ words }) => {

    return (<div style={{
        padding: '0.1vh 0.1vw 0.1vh 0.1vw',
        paddingLeft: '20px'
    }} key={"" + Date.now}>{words}</div>);
}

export default StreamItem;
