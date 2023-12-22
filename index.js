import products from "./data/data.js";

/**
 AÑADIR ELEMENTOS AL BODY 
 */
const addHtmlContent = (child) => {
  document.body.appendChild(child);
};
/**
 CREACIÓN HEADER
 */

const addHTML = (header) => {
  document.body.innerHTML += header;
};

addHTML(`
  <header class="header">
    <img class="logo" src= "./images/logo1.jpg"></img>
    <nav class="list_item">
      <ul >
        <li><a href='#'>HOME</a></li>
        <li><a href='#ABOUT'>ABOUT</a></li>
        <li><a href='#CONTACT'>CONTACT</a></li>
      </ul>
    </nav>
  </header>
`);

/**
CREACIÓN DE UNA TARJETA DE PRODUCTOS USANDO TAGTEMPLATE - DOM
 */

const displayProduct = (product) => {
  const container = document.createElement("section");
  container.classList.add("container");
  const productElement = document.createElement("article");

  productElement.classList.add("card");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("card_img");

  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.alt = product.name;

  const textContainer = document.createElement("div");
  textContainer.classList.add("card_content");

  const productName = document.createElement("h3");
  productName.textContent = product.name;

  const productSeller = document.createElement("h4");
  productSeller.textContent = `${product.seller}`;

  const productPrice = document.createElement("p");
  productPrice.textContent = `${product.price} €`;

  imgContainer.appendChild(productImage);
  textContainer.appendChild(productName);
  textContainer.appendChild(productSeller);
  textContainer.appendChild(productPrice);

  productElement.appendChild(imgContainer);
  productElement.appendChild(textContainer);

  return productElement;
};

const productSection = document.createElement("section");
productSection.classList.add("container");
products.forEach((product) => {
  productSection.appendChild(displayProduct(product));
});

addHTML(`
<div id="filter-options">
  <div id="filter_sellers">
    <select id="seller-options">
      <option value="">-- SELECT SELLER --</option>
      <option value="PcComponentes">PcComponentes</option>
      <option value="infopavon">infopavon</option>
      <option value="TD Systems Official">TD Systems Official</option>
      <option value="Ocasionia">Ocasionia</option>
    </select>
  </div>
  <div id="filter-buttons">
    <input id="price" type="number" min="25" placeholder="Price" />
    <button id="button-search">Search</button>
    <button id="button-reset">Reset</button>
  </div>
</div>

`);

addHtmlContent(productSection);

addHTML(
  `<footer class="footer">
  <p>&copy; 2023 Alba Martínez</p><br>
  <h4>Create in ThePower Business School</h4
  `
);

/**APLICACIÓN DE FILTROS SELLER */
let currentSeller = "";

const filterSeller = (selectedSeller) => {
  const filterProducts = products.filter((product) => {
    if (selectedSeller === "") {
      return true;
    } else {
      currentSeller = selectedSeller;
      return product.seller === selectedSeller;
    }
  });

  const productSection = document.querySelector(".container");
  productSection.innerHTML = "";
  filterProducts.forEach((product) => {
    productSection.appendChild(displayProduct(product));
  });
};

const filterPrice = (price) => {
  const filteredProducts = products.filter((product) => {
    if (currentSeller === "") return product.price <= price;
    return product.seller === currentSeller && product.price <= price;
  });

  const productSection = document.querySelector(".container");
  productSection.innerHTML = "";

  if (filteredProducts.length === 0) {
    productSection.innerHTML = `<h3>There is no products with this price</h3>`;
  } else {
    filteredProducts.forEach((product) => {
      productSection.appendChild(displayProduct(product));
    });
  }
};

// Options to select by seller
const sellerOptions = document.querySelector("#seller-options");

sellerOptions.addEventListener("change", () => {
  const selectedSeller = document.querySelector("#seller-options").value;
  filterSeller(selectedSeller);
});

/**APLICACION FILTRO PRICE */

// Button to search by price
const searchbutton = document.querySelector("#button-search");

searchbutton.addEventListener("click", () => {
  const selectedPrice = Number(document.querySelector("#price").value);

  filterPrice(selectedPrice);
});

//Reset

const resetbutton = document.querySelector("#button-reset");
resetbutton.addEventListener("click", () => {
  document.querySelector("#price").value = "";
  document.querySelector("#seller-options").value = "";
  const container = document.querySelector(".container");
  container.innerHTML = "";
  products.forEach((product) => {
    container.appendChild(displayProduct(product));
  });
});
