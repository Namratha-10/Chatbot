function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput) {
        appendMessage("You: " + userInput, "user");
        document.getElementById("user-input").value = "";

        // Send the user message to the backend (Flask API)
        $.ajax({
            url: '/ask',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ question: userInput }),
            success: function(response) {
                appendMessage("Bot: " + response.answer, "bot");
            }
        });
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function appendMessage(message, sender) {
    var chatbox = document.getElementById("chatbox");
    var messageDiv = document.createElement("div");
    messageDiv.classList.add(sender);
    messageDiv.innerText = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}