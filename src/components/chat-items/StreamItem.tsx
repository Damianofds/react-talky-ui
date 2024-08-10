interface StreamItemProps {
    id: string;
    words: string;
}

const StreamItem: React.FC<StreamItemProps> = ({ words }) => {

    return (<div key={""+Date.now}>{words}</div>);
}

export default StreamItem;
