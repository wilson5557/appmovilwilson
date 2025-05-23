const cart = [];
let receiptCount = 0;
const receipts = [];

function addItemToCart(name, description, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const item = {
            name: name,
            description: description,
            price: price,
            image: image,
            orderTime: new Date().toLocaleTimeString(),
            quantity: 1
        };
        cart.push(item);
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart');
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="small-image">
            <h1>${item.name} x${item.quantity}</h1>
            <p>${item.description}</p>
            <p>Precio: $${item.price}</p>
            <p>Order Time: ${item.orderTime}</p>
            <button onclick="removeItemFromCart(${index})">Remover</button>
        `;
        cartContainer.appendChild(itemElement);
    });
}

function showPreparationTime(type) {
    let time;
    if (type === 'bebida') {
        time = Math.floor(Math.random() * (240 - 30 + 1)) + 30;
    } else {
        time = Math.floor(Math.random() * (900 - 300 + 1)) + 300;
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const banner = document.getElementById('preparation-time-banner');
    const timeText = document.getElementById('preparation-time');
    timeText.textContent = `${minutes} minutos y ${seconds} segundos.`;
    banner.style.display = 'block';
    setTimeout(() => {
        banner.style.display = 'none';
    }, 4000); // 4 segundos
}

function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function completePurchase() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío!');
        return;
    }
    const receipt = generateReceipt();
    receipts.push(receipt);
    addReceiptToList(receipt);
    showReceiptModal(receipt);
    cart.length = 0;
    updateCartDisplay();
}

function generateReceipt() {
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    let receipt = `<p>Recibo para: ${nombreUsuario}</p><ul>`;
    cart.forEach(item => {
        receipt += `<li>Nombre: ${item.name} x${item.quantity} - Precio: $${(item.price * item.quantity).toFixed(2)} - Order Time: ${item.orderTime}</li>`;
    });
    receipt += `</ul><p>Precio total: $${cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)}</p>`;
    receiptCount++;
    return receipt;
}

function addReceiptToList(receiptContent) {
    const receiptList = document.getElementById("receipt-list");
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a href="#" onclick="showReceiptFromList(${receiptCount - 1})">Factura ${receiptCount}</a>`;
    receiptList.appendChild(listItem);
}

function showReceiptFromList(index) {
    const receipt = receipts[index];
    showReceiptModal(receipt);
}

function showReceiptModal(receiptContent) {
    const modal = document.getElementById("receipt-modal");
    const modalContent = document.getElementById("receipt-content");
    modalContent.innerHTML = receiptContent;
    modal.style.display = "block";
}

document.querySelectorAll('.plato button').forEach(button => {
    button.addEventListener('click', event => {
        const plato = event.target.closest('.plato');
        const name = plato.querySelector('h1').innerText;
        const description = plato.querySelector('p').innerText;
        const price = plato.querySelector('.plato--info p').innerText.replace('$', '');
        const image = plato.querySelector('img').src;
        addItemToCart(name, description, price, image);
        showPreparationTime(plato.querySelector('h1').innerText.toLowerCase().includes('bebida') ? 'bebida' : 'comida');
    });
});
document.querySelector('.complete-purchase').addEventListener('click', completePurchase);

const modal = document.getElementById("receipt-modal");
const closeModal = document.querySelector(".close");

closeModal.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const toggleReceiptButton = document.getElementById("toggle-receipt-list");
const receiptListContainer = document.getElementById("receipt-list-container");

toggleReceiptButton.onclick = function() {
    if (receiptListContainer.style.display === "none") {
        receiptListContainer.style.display = "block";
    } else {
        receiptListContainer.style.display = "none";
    }
}
