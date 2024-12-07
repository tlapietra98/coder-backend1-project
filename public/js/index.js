// Setting up the socket from the clients side
const socket = io(); // Referencing socket.io

let user;

let chatBox = document.getElementById("chatBox");

const from = document.getElementById("form");
const productsList = document.getElementById("productsList");


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


from.onsubmit = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const price = e.target.elements.price.value;
    const stock = e.target.elements.stock.value;

    const product = {
        title,
        price,
        stock,
    };

    // Send product to server
    console.log(product);
    socket.emit("product", product);
};

socket.on("products", (data) => {
    productsList.innerHTML = "";
    data.forEach((product, index) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <p>Title: ${product.title}<p/>
        <p>Price: ${product.price}<p/>
        <p>Stock: ${product.stock}<p/>
        `;

        productsList.append(div);
        const btn = document.createElement("button");
        btn.innerText = "Buy";
        btn.onclick = () => {
            console.log("Buying...");
            data[index].stock = data[index].stock -1;
            socket.emit("changeStock", data);
        };
        div.append(btn);
    });
});
