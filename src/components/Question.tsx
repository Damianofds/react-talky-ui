import React, { useContext, useEffect } from 'react';
import { ConversationContext } from '../ConversationContext';

interface WordStreamerProps {
    words: string;
}

const Question: React.FC<WordStreamerProps> = ({ words }) => {

    const { saveSentence } = useContext(ConversationContext);

    const displaySentence = (sentence: string) => {
        saveSentence(<div>
            <br />
            <div style={{
                borderRadius: '15px',
                marginLeft: '55%',
                padding: '2%',
                maxWidth: '75%',
                textAlign: 'right',
                backgroundColor: '#4ea699'
            }}
                key={words}>
                {sentence}
            </div><br /></div>);
    }

    useEffect(() => {
        displaySentence(words);
    }, []);

    return (<></>);
}

export default Question;