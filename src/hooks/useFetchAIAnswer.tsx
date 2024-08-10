import { useState } from 'react';

const API_URL = 'http://localhost:5678/webhook/9fb54256-f38b-4992-94e5-432cde55075d';
// const TEST_API_URL = 'http://localhost:5678/webhook-test/9fb54256-f38b-4992-94e5-432cde55075d';

const useFetchAIAnswer = (question: string) => {

    const [aiAnswer, setAnswer] = useState('');

    const fetchAIAnswer = async () => {
        fetch(API_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: question})
        })
        .then(response => response.json())
        .then(data => setAnswer(data.response.text))
        .catch(error => console.error('Error fetching conversations:', error));
    };

    return {aiAnswer, fetchAIAnswer};
};

export default useFetchAIAnswer;