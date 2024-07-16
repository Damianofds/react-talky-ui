import React, { useState } from 'react';
import WordStreamer from './WordStreamer';
import ButtonsStreamer from './ButtonsStreamer';

interface QuestionFormProps {
    currentSentence: any;
}

const ButtonsForm: React.FC<QuestionFormProps> = ({ currentSentence }) => {

    const [isWordStreamingFinished, setWordStreamingFinished] = useState(false);

    return (
        <>
            <WordStreamer words={currentSentence.text}
                setStreamingFinished={setWordStreamingFinished} />
            {isWordStreamingFinished && <ButtonsStreamer buttons={
                [currentSentence.yesButton, currentSentence.noButton]}
            />}
        </>
    );
}

export default ButtonsForm;