import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const dataSource = new ProductData("tents");
const parentElement = document.querySelector(".product-list");
const productListing = new ProductListing("Tents", dataSource, parentElement);

productListing.init();
