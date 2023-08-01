const title = document.getElementById("title"),
    price = document.getElementById("price"),
    taxes = document.getElementById("taxes"),
    discount = document.getElementById("discount"),
    total = document.getElementById("total"),
    count = document.getElementById("count"),
    category = document.getElementById("category"),
    createBtn = document.getElementById("createBtn"),
    deleteAllBtn = document.getElementById("deleteAllBtn"),
    searchInput = document.getElementById("searchInput"),
    titleSearch = document.getElementById("titleSearch"),
    categorySearch = document.getElementById("categorySearch"),
    tBody = document.getElementById("tBody"),
    deleteBtn = document.getElementById("deleteBtn"),
    updateBtn = document.getElementById("updateBtn"),
    scrollBtn = document.getElementById("scrollBtn"),
    colorModeBtn = document.getElementById("colorModeBtn");

let dataMode = "create",
    searchMode = "title",
    colorMode,
    x,
    products,
    table;

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
};
