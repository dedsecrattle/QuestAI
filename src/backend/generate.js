export function generateMaterial(topic, subtopic, level) {
    const requestBody = {
        topic,
        subtopic,
        level
    };
    return fetch("https://questai-backend.onrender.com/generate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            data = data["generated_content"]
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export function generateQuiz(topic, subtopic, level) {
    const requestBody = {
        topic,
        subtopic,
        level
    };
    return fetch("https://questai-backend.onrender.com/quiz", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            data = data["generated_content"]
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export function generateSummary(extracted_text) {
    const requestBody = {
        extracted_text
    };
    return fetch("https://questai-backend.onrender.com/summary", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            data = data["generated_content"]
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



