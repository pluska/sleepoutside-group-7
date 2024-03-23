import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", "checkout-summary");

checkout.init()

document.querySelector("#zip").addEventListener("blur", checkout.calculateTotal.bind(checkout))

document.querySelector("#checkout").addEventListener("submit", (event) => {
  event.preventDefault();
  checkout.checkout();
})