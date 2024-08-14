interface OriginVisualizerProps {
    origin: string;
}

const OriginVisualizer: React.FC<OriginVisualizerProps> = ({origin}) => {

    const color: string = (() => {
        switch (origin) {
            case 'static-talk':
                return '#DD6031';
            case 'history':
                return '#D5CFE1';
            case 'internal-qa':
                return '#F2E3BC';
            case 'gpt-4o-mini':
                return '#CB958E';
            default:
                return '#3F403F';
        }
    })();

    return (
        <div style={{ display: 'inline' }}>
            origin: <pre style={{ display: 'inline', padding: '2px', margin: '0', backgroundColor: color }}>{origin}</pre>
        </div>
    );
};

export default OriginVisualizer;