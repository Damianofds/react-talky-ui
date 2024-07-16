import React, { useState } from 'react';
import WordStreamer from './WordStreamer';
import RadioStreamer from './RadioStreamer';

interface RadioFormProps {
    currentSentence: any;
}

const RadioForm: React.FC<RadioFormProps> = ({ currentSentence }) => {

    const [isWordStreamingFinished, setWordStreamingFinished] = useState(false);

    return (
        <>
            <WordStreamer words={currentSentence.text}
                setStreamingFinished={setWordStreamingFinished} />
            {isWordStreamingFinished && <RadioStreamer
                submitButtonLabel={currentSentence.submitButtonLabel}
                options={currentSentence.options}
            />}
        </>
    );
}

export default RadioForm;