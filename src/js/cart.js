import { loadHeaderFooter } from "./utils.mjs";
import Cart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new Cart("so-cart", ".cart");

cart.renderCartContents();
