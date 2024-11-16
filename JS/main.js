const API_URL = "https://673864bf4eb22e24fca7c7b7.mockapi.io/products";

async function getProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    showMessage("Error fetching products:" + error.message, "error");
  }
}

function displayProducts(products) {
  const productlist = document.getElementById("product_list");
  productlist.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.id = "prod";
    productElement.innerHTML = `
      <img src="${product.img_product}" alt="${product.name_product}"></img>
      <h3>${product.name_product}</h3>
      <p>${product.desc_product}</p>
      <button onclick="deleteProduct()" id="delete">Удалить товар</button> 
    `;
    const theFirstChild = productlist.firstChild;
    productlist.insertBefore(productElement, theFirstChild);
  });
}

async function addProduct(event) {
  event.preventDefault();
  const newProduct = {
    name_product: document.getElementById("productName").value,
    img_product: document.getElementById("productImage").value,
    desc_product: document.getElementById("productDescription").value,
  };
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    getProducts();
    showMessage("Товар успешно создан");
  } catch (error) {
    showMessage("Error adding products:" + error.message, "error");
  }
}

function showMessage(message, type = "success") {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.className = type;
  messageElement.style.display = "flex";
  setTimeout(() => (messageElement.style.display = "none"), 3000);
}

function deleteProduct() {
  const product = document.getElementById("prod");
  product.remove();
}



document.getElementById("product_form").addEventListener("submit", addProduct);

getProducts();
