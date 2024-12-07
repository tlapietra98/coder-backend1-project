console.log("Hello World from the server, ready to add socket.");
// Setting up the socket from the clients side
const socket = io(); // Referencing socket.io

// Send an event to the server
socket.emit("message", "Hello from the FrontEnd!");

// Listening to server sockets, names must match
socket.on("individual-socket", (data) => {
    console.log(data);
});

socket.on("exclusionary-socket", (data) => {
    console.log(data);
});

socket.on("all-sockets", (data) => {
    console.log(data);
});