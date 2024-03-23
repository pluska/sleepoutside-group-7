import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="cart-card__close" data-id="${item.Id}">❌</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class Cart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  removeFromCart(id) {
    const cartItems = getLocalStorage(this.key);
    const newCartItems = cartItems.filter((item) => item.Id !== id);
    setLocalStorage(this.key, newCartItems);
    this.renderCartContents();
  }

  calculateTotal() {
    const cartItems = getLocalStorage(this.key);
    let total = 0;
    cartItems.forEach((item) => (total += item.FinalPrice));
    return total;
  }

  renderCartContents() {
    const cartItems = getLocalStorage("so-cart");
    if(cartItems.length === 0) {
      document.querySelector(".cart-footer").classList.add("hide");
      return document.querySelector(this.parentSelector).innerHTML = "<p>Your Cart is empty</p>";
    } else {
      document.querySelector(".cart-footer").classList.remove("hide");
    }
    document.querySelector(".cart-total").textContent += `$${this.calculateTotal()}`
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
  }
}