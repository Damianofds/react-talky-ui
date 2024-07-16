import React, { useState } from 'react';
import WordStreamer from './WordStreamer';
import ButtonStreamer from './ButtonStreamer';

interface QuestionFormProps {
    currentSentence: any;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ currentSentence }) => {

    const [isWordStreamingFinished, setWordStreamingFinished] = useState(false);

    return (
        <>
            <WordStreamer words={currentSentence.text}
                setStreamingFinished={setWordStreamingFinished} />
            {isWordStreamingFinished && <ButtonStreamer buttons={
                [currentSentence.yesButton, currentSentence.noButton]}
            />}
        </>
    );
}

export default QuestionForm;