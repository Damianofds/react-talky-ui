interface SpacerProps {
    
}

const Spacer: React.FC<SpacerProps> = ({ }) => {
    return (
        <div style={{
            height:'1em',
            display:'block',
            backgroundColor:'transparent'
        }}>
            
        </div>
    );
};

export default Spacer;
