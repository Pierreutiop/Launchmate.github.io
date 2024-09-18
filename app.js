async function sendToOpenAI(userInput) {
    const apiKey = 'TON_CLE_API'; // Mets ta clé API ici
    const url = 'https://api.openai.com/v1/completions';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: userInput,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API OpenAI : ", error);
        return "Désolé, une erreur est survenue. Veuillez réessayer.";
    }
}

document.getElementById('send-btn').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    appendMessage('user', userInput);
    document.getElementById('user-input').value = "";

    const botResponse = await sendToOpenAI(userInput);
    appendMessage('bot', botResponse);
});

function appendMessage(sender, message) {
    const messageContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
