const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
  }
  async getData(category) {
    return await fetch(`${baseURL}products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
  async findProductById(id) {
    return await fetch(`${baseURL}product/${id}`)
    .then(convertToJson)
    .then((data) => data.Result);
  }
}
