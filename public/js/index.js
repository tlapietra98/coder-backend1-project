// Setting up the socket from the clients side
const socket = io(); // Referencing socket.io

const from = document.getElementById("form");
const productsList = document.getElementById("productsList");


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
