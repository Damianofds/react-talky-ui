import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5678/webhook/9fb54256-f38b-4992-94e5-432cde55075d';

const useFetchAnswer = (question: string) => {

    const [answer, setAnswer] = useState("");

    useEffect(() => {
        if(answer != ""){
            fetch(API_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message: question})
            })
            .then(response => response.json())
            .then(data => setAnswer(data.answer))
            .catch(error => console.error('Error fetching conversations:', error));
        }
    }, [question]);

    return answer;
};

export default useFetchAnswer;