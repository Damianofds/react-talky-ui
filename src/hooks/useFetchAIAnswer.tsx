import { useEffect, useState } from 'react';

const API_URL = import.meta.env.TALKY_QA_API_URL;

const useFetchAIAnswer = (question: string) => {

    const [aiAnswer, setAnswer] = useState('');
    const [text, setText] = useState('');

    const fetchAIAnswer = async () => {
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
    };

    useEffect(() => {
        setAnswer(() => '');
        const textArray = text.split(" ");
        let counter = 0;
        const intervalId = setInterval(() => {
            if(counter >= textArray.length){
                clearInterval(intervalId);
            }
            else{
                setAnswer(prev => prev + " " + textArray[counter]);
                counter++;
            }
        }, 100);
    },[text]);

    return {aiAnswer, fetchAIAnswer};
};

export default useFetchAIAnswer;