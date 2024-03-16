import { loadHeaderFooter } from "./utils.mjs";
import Cart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new Cart("so-cart", ".product-list");

cart.renderCartContents();

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.matches(".cart-card__close")) {
    cart.removeFromCart(e.target.dataset.id);
  }
});
