const API_URL = "https://fakestoreapi.com/products";

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
      <img src="${product.image}" alt="${product.title}"></img>
      <h3>${product.title}</h3>
      <span>${product.description}</span>
      <p>${product.category}</p>
      <button class="delete" data-id="${product.id}" id="delete">Удалить товар</button> 
    `;
    const deleteBtn = productElement.querySelectorAll(".delete");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        fetch(`https://fakestoreapi.com/products/${btn.dataset.id}`, {
          method: "DELETE",
        }).then(() => {
          productElement.style.display = "none";
          showMessage_2();
        });
      });
    });
    productlist.appendChild(productElement);
  });
}

async function addProduct(event) {
  event.preventDefault();
  const newProduct = {
    title: document.getElementById("productName").value,
    image: document.getElementById("productImage").value,
    description: document.getElementById("productDescription").value,
    category: document.getElementById("productCategory").value,
  };
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    showMessage("Товар успешно создан");
    getProducts();
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

function showMessage_2(message, type = "success") {
  const messageElement = document.getElementById("message_2");
  messageElement.textContent = "товар успешно удален";
  messageElement.className = type;
  messageElement.style.display = "flex";
  setTimeout(() => (messageElement.style.display = "none"), 1000);
}

document.getElementById("product_form").addEventListener("submit", addProduct);

getProducts();

async function getCategories() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const categories = await response.json();
    displayCategories(categories);
  } catch (error) {
    showMessage("Error fetching products:" + error.message, "error");
  }
}

function displayCategories(categories) {
  const filterCat = document.getElementById("filterCat");
  filterCat.innerHTML = "";

  categories.forEach((categori) => {
    const categoriItem = document.createElement("div");
    categoriItem.className = "cat";
    categoriItem.id = "catig";
    categoriItem.innerHTML = `
    <div>${categori}</div>
    <button onclick=
    "getCategoriesJewerly()" id="btnCat">click</button>
    `;

    filterCat.appendChild(categoriItem);
  });
}

const filt = document.getElementById("filter");
filt.addEventListener("click", getCategories);

async function getCategoriesJewerly() {
  try {
    const response = await fetch(
      'https://fakestoreapi.com/products/category/jewelery'
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const jewerly = await response.json();
    console.log(jewerly);
    displayJewerly(jewerly);
  } catch (error) {
    showMessage("Error fetching products:" + error.message, "error");
  }
}

function displayJewerly(jewerly) {
  const product = document.getElementById("prod");
  const jewerlyElem = document.getElementById("jewerly");
  jewerlyElem.textContent = `${product}`;
  jewerlyElem.style.display = "flex";
}

/*const jewerlyBtn = document.getElementById("btnCat").addEventListener("click", getCategoriesJewerly);*/
