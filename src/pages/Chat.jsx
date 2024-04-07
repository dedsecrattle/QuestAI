import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [prompt, setPrompt] = useState('What is a Semaphore?');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://127.0.0.1:5000/generate', { prompt },{headers:{"Content-Type" : "application/json"}});
            console.log(res.data.response);
        } catch (err) {
            console.error(err.data);
            setResponse('An error occurred while generating the response.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                />
                <button type="submit">Generate</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    );
};

export default Chat;