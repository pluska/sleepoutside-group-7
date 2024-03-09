import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";


const dataSource = new ProductData("tents");
const parentElement = document.querySelector(".product-list");
const productListing = new ProductListing("Tents", dataSource, parentElement);

productListing.init();