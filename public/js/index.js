// Setting up the socket from the clients side
const socket = io(); // Referencing socket.io

let user;

let chatBox = document.getElementById("chatBox");

// Alert - Enter user data
Swal.fire({
    title: "Identify yourself.",
    input: "text",
    text: "Enter your username to identify yourself.",
    inputValidator: (value) => {
        return !value && "Please enter a username.";
    },
    allowOutsideClick: false
}).then((result) => {
    user = result.value;
    console.log(user);

    // We send the user to the server
    socket.emit("newUser", user);
})


// Event - Chat message
chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("message", { user: user, message: chatBox.value });
            chatBox.value = "";
        }
    }
});

// Socket - Update chat messages
socket.on("messageLogs", (data) => {
    let messageLogs = document.getElementById("messageLogs");
    let messages = "";

    if(!data){
        console.log("Error retrieving messages!");
    }

    data.forEach((logMessage) => {
        messages = messages + `${logMessage.user} says: ${logMessage.message} </br>`;
    });

    messageLogs.innerHTML = messages;
});


// Socket - New user notification
socket.on("newUser", (data) => {
    Swal.fire({
        text: `${data} has connected.`,
        toast: true,
        position: "top-right",
        timer: 2000
    });
});