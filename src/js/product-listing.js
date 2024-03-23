import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ExternalServices();
const parentElement = document.querySelector(".product-list");
const productListing = new ProductListing(category, dataSource, parentElement);

productListing.init();
