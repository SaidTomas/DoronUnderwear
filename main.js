//alert("Bienvenidos a Doron");
//DESAFIO FUNCION
/*
const x = 5;
let carrito = 0;
const remeras = 1000;
const buzos = 3000;
const pantalones = 4000;
let cantidadRemeras;
let cantidadBuzos;
let cantidadPantalones;

function catalogo() {
    for (let i = 0; i < x; i++) {
        let ingreso = parseInt(
            prompt("Catalogo: \n 1-Remeras \n 2-Buzos \n 3-Pantalones \n 4-Salir")
        );
        if (ingreso == 1) {
            cantidadRemeras = parseInt(prompt("Ingrese cantidad de remeras"));
            carrito += cantidadRemeras * remeras;
        } else if (ingreso == 2) {
            cantidadBuzos = parseInt(prompt("Ingrese cantidad de buzos"));
            carrito += cantidadBuzos * buzos;
        }
        if (ingreso == 3) {
            cantidadPantalones = parseInt(prompt("Ingrese cantidad de pantalones"));
            carrito += cantidadPantalones * pantalones;
        } else if (ingreso == 4) {
            console.log(
                `El total de la compra es: $ ${carrito} \n remeras : ${cantidadRemeras} \n buzos : ${cantidadBuzos} \n pantalones : ${cantidadPantalones}`
            );
            break;
        }
    }
}
catalogo(x); */

//DESAFIO ARRAYS
/*
let productos = {
    remeras : 1000,
    pantalones : 4000,
    buzos : 3000,
};
let remeras = productos ["remeras"];
let pantalones = productos ["pantalones"];
let buzos = productos ["buzos"];

console.log(`En un principio tenemos remeras que cuestan ${remeras},
tambien tenemos pantalones que estan ${pantalones} y por
ultimo tenemos unos buzos que te quedan a ${buzos}`);  */




/*const productos = newFunction();

function newFunction() {
    return [{
        id: 1,
        nombre: 'Remeras',
        precio: 1500
    }, {
        id: 2,
        nombre: 'Jeans',
        precio: 4000
    }, {
        id: 3,
        nombre: 'Hoddies',
        precio: 5000
    }, {
        id: 4,
        nombre: 'Campereas',
        precio: 6000
    }];
}

    for (const producto of productos) {
        let contenedor = document.createElement("div");

        contenedor.innerHTML = `<h3> ID: ${producto.id} </h3>
        <p> ID: ${producto.nombre} </p>
        <b> ID: ${producto.precio} </b>`;

        document.body.appendChild (contenedor);
    } */

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.card');

    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.card-text').textContent;
    const itemImage = item.querySelector('.card-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[
                i
            ].parentElement.parentElement.parentElement.querySelector(
                '.shoppingCartItemQuantity'
            );
            elementQuantity.value++;
            $('.toast').toast('show');
            updateShoppingCartTotal();
            return;
        }
    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src=${itemImage} class="shopping-cart-image">
                    <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
                </div>
            </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                        value="1">
                    <button class="btn btn-danger buttonDelete" type="button">X</button>
                </div>
            </div>
        </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow
        .querySelector('.buttonDelete')
        .addEventListener('click', removeShoppingCartItem);

    shoppingCartRow
        .querySelector('.shoppingCartItemQuantity')
        .addEventListener('change', quantityChanged);

    updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('€', '')
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}€`;
}

function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}