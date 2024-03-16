import { renderListWithTemplate } from "./utils.mjs";

const productCardTemplate = (product) =>
  `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    const title = document.getElementById("category");
    const categorySplit = this.category.split("-");
    for (let i = 0; i < categorySplit.length; i++) {
      categorySplit[i] = categorySplit[i].charAt(0).toUpperCase() + categorySplit[i].slice(1);
    }
    title.innerHTML = categorySplit.join(" ");
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}