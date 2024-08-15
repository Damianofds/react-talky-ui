import { useEffect, useState } from 'react';
import { StreamItemConfig } from '../components/chat-items/TalkItemsConfig';
import { isPlaceholderSettingsValue} from '../components/utils/FunctionUtilities';

const API_URL = import.meta.env.TALKY_QA_API_URL;

const useFetchAIAnswer = (question: string) => {

    const [aiAnswer, setAnswer] = useState<StreamItemConfig>({
        id: "stream-" + Date.now(),
        text: '',
        type: 'stream',
        isCompleted: false,
        origin: 'internal-qa',
    });
    const [text, setText] = useState('');

    const fetchAIAnswer = async () => {
        if(isPlaceholderSettingsValue(API_URL)){
            //TODO: this message should be streamed as well!
            setAnswer(prev => ({
                ...prev,
                text: 'I\'m sorry but the Q&A backend service is not set for this demo :('
            }))    
        } else{
            fetch(API_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message: question})
            })
            .then(response => response.json())
            .then(data => setText(data.response.text))
            .catch(error => console.error('Error fetching conversations:', error));
        }
    };

    useEffect(() => {
        setAnswer({id: "stream-" + Date.now(),
            text: '',
            type: 'stream',
            isCompleted: false,
            origin: 'internal-qa',
        });
        const textArray = text.split(" ");
        let counter = 0;
        const intervalId = setInterval(() => {
            if(textArray.length > 0 && counter >= textArray.length){
                clearInterval(intervalId);
                setAnswer(prev => ({
                    id: "stream-" + Date.now(),
                    text: prev.text,
                    type: 'stream',
                    isCompleted: true,
                    origin: 'internal-qa',
                }));
            }
            else{
                setAnswer((prev) => ({
                    ...prev,
                    text: prev.text + " " + textArray[counter]
                }));
                counter++;
            }
        }, 100);
    },[text]);

    return {aiAnswer, fetchAIAnswer};
};

export default useFetchAIAnswer;