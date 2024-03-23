import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

const formDataToJson = (formElement) => {
  const formData = new FormData(formElement),
  jsonConvertedData = {};

  formData.forEach((value, key) => {
    jsonConvertedData[key] = value
  });

  return jsonConvertedData
};

const packageItems = (items) => {
  const simpleItems = items.map((item) =>
    ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    })
  );

  return simpleItems
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.cart = [];
    this.subtotal = 0;
    this.total = 0;
    this.tax = 0;
    this.shipping = 0;
    this.items = 0;
  }
  init () {
    this.cart = getLocalStorage(this.key)
    this.calculateItems()
  }

  calculateItems() {
    this.items = this.cart.length
    for (let i = 0; i < this.cart.length; i++) {
    this.subtotal += this.cart[i].FinalPrice;
    }

    document.querySelector(".cart-subtotal").textContent += `$${this.subtotal}`
    document.querySelector(".cart-items").textContent += `${this.items}`
  }
  calculateTotal() {
    let shipping = 0;
    for (let i = 0; i < this.cart.length; i++) {
      if(i === 0) {
        shipping += 10
      } else {
        shipping += 2
      }
    }
    this.shipping = shipping
    this.tax = (this.subtotal * 0.06).toFixed(2)
    this.total = (this.subtotal + parseFloat(this.tax) + parseFloat(this.shipping)).toFixed(2)
    this.displayOrderTotal()
  }
  displayOrderTotal() {
    document.querySelector(".cart-tax").textContent += `$${this.tax}`
    document.querySelector(".cart-shipping").textContent += `$${this.shipping}`
    document.querySelector(".cart-total").textContent += `$${this.total}`
  }

  async checkout() {
    const formElement = document.forms["checkout"];
    const body = formDataToJson(formElement);
    const date = new Date();
    body.orderDate = date.toISOString();
    body.tax = this.tax;
    body.shipping = this.shipping;
    body.orderTotal = this.total;
    body.items = packageItems(this.cart)

    console.log(body);
    try {
      const response = await services.checkout(body);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

}