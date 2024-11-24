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
      <button class="delete" data-id="${product.id}" id="delete">Удалить товар</button> 
    `;

    /*const deleteBtn = productElement.querySelector(".delete");
    deleteBtn.addEventListener("click", function () {
      if (confirm("Вы точно хотите удалить этот продукт?")) {
        productElement.remove();
      }
    });*/
  
    const deleteBtn = productElement.querySelectorAll(".delete");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        fetch(
          `https://673864bf4eb22e24fca7c7b7.mockapi.io/products/${btn.dataset.id}`,
          {
            method: "DELETE",
          }
        ).then(() => {
          showMessage_2();
          getProducts();
        });
      });
    });
    productlist.appendChild(productElement);
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

function showMessage_2(message, type = "success") {
  const messageElement = document.getElementById("message_2");
  messageElement.textContent = 'товар успешно удален';
  messageElement.className = type;
  messageElement.style.display = "flex";
  setTimeout(() => (messageElement.style.display = "none"), 1000);
}

document.getElementById("product_form").addEventListener("submit", addProduct);

getProducts();
