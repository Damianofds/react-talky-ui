import { useState } from 'react';

const API_URL = 'http://localhost:5678/webhook/9fb54256-f38b-4992-94e5-432cde55075d';

const useFetchAnswer = (question: string) => {

    const [answer, setAnswer] = useState('');

    const fetchData = async () => {
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

    return {answer, fetchData};
};

export default useFetchAnswer;