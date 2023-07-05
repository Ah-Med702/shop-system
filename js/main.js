const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const createBtn = document.getElementById("createBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const searchInput = document.getElementById("searchInput");
const titleSearch = document.getElementById("titleSearch");
const categorySearch = document.getElementById("categorySearch");
const tBody = document.getElementById("tBody");
const deleteBtn = document.getElementById("deleteBtn");
const updateBtn = document.getElementById("updateBtn");
const scrollBtn = document.getElementById("scrollBtn");
const colorModeBtn = document.getElementById("colorModeBtn");

let dataMode = "create";
let searchMode = "title";
let colorMode;
let x;
let products;
let table;

if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}

function setTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + -discount.value;
    total.innerHTML = result;
    total.style.background = "#060";
    total.style.color = "#fff";
  } else {
    total.innerHTML = "";
    total.style.background = "#600";
  }
}

function create() {
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    let product = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    };
    if (dataMode == "create") {
      if (product.count > 1) {
        for (i = 0; i < product.count; i++) {
          products.push(product);
        }
      } else {
        products.push(product);
      }
    } else {
      products[x] = product;
      dataMode = "create";
      createBtn.innerHTML = "create";
      count.style.display = "block";
    }
    localStorage.setItem("product", JSON.stringify(products));
    remove();
    read();
    showDelBtn();
  }
}

function read() {
  let table = "";
  for (i = 0; i < products.length; i++) {
    table += `
            <tr class="text-center">
                <th scope="row">${i + 1}</th>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td> 
                <td><button onclick="updateItem(${i})" id="updateBtn" class="btn">update</button></td> 
                <td><button onclick="deleteItem(${i})" id="deleteBtn" class="btn">delete</button></td> 
            </tr>
      `;
  }
  document.getElementById("tBody").innerHTML = table;
}

function remove() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.background = "#600";
}

function showDelBtn() {
  if (document.getElementById("tBody").innerHTML != "") {
    deleteAllBtn.style.display = "block";
    deleteAllBtn.innerHTML = `delete all ( ${products.length} )`;
  }
}

function deleteAll() {
  products.splice(0);
  localStorage.product = JSON.stringify(products);
  read();
  deleteAllBtn.style.display = "none";
}

function deleteItem(i) {
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  deleteAllBtn.innerHTML = `delete all ( ${products.length} )`;
  read();
}

function updateItem(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  discount.value = products[i].discount;
  setTotal();
  count.style.display = "none";
  category.value = products[i].category;
  createBtn.innerHTML = "update";
  dataMode = "update";
  x = i;
  scrollTo(0, 0);
}

function setSearch(id) {
  if (id == "titleSearch") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  searchInput.placeholder = "search by " + searchMode;
  searchInput.focus();
  searchInput.value = "";
  read();
}

function search(value) {
  let table = "";
  if (searchMode == "title") {
    for (i = 0; i < products.length; i++) {
      if (products[i].title.includes(value.toLowerCase())) {
        table += `
            <tr class="text-center">
                <th scope="row">${i + 1}</th>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td> 
                <td><button onclick="updateItem(${i})" id="updateBtn" class="btn">update</button></td> 
                <td><button onclick="deleteItem(${i})" id="deleteBtn" class="btn">delete</button></td> 
            </tr>
      `;
      }
    }
  } else {
    for (i = 0; i < products.length; i++) {
      if (products[i].category.includes(value.toLowerCase())) {
        table += `
            <tr class="text-center">
                <th scope="row">${i + 1}</th>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td> 
                <td><button onclick="updateItem(${i})" id="updateBtn" class="btn">update</button></td> 
                <td><button onclick="deleteItem(${i})" id="deleteBtn" class="btn">delete</button></td> 
            </tr>
      `;
      }
    }
  }
  document.getElementById("tBody").innerHTML = table;
}
read();
showDelBtn();

window.onscroll = () => {
  if (scrollY >= 400) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.onclick = () => {
  window.scrollTo(0, 0);
};


function changeColorMode() {
  if (document.body.hasAttribute("data-bs-theme")) {
    document.body.removeAttribute("data-bs-theme");
    document.getElementById("sun").style.display = "none";
    document.getElementById("moon").style.display = "block";
    colorMode = "light";
    localStorage.setItem("color", colorMode);
  } else {
    document.body.setAttribute("data-bs-theme", "dark");
    document.getElementById("sun").style.display = "block";
    document.getElementById("moon").style.display = "none";
    colorMode = "dark";
    localStorage.setItem("color", colorMode);
  }
}

window.onload = () => {
  if (localStorage.color != "light") {
    changeColorMode();
  }
}
