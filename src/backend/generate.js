export function generateMaterial(topic, subtopic) {
    const requestBody = {
        topic,
        subtopic
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

