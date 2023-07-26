var addProductButton = document.getElementById("addProduct");
var saveChangedProduct = document.getElementById("saveChangedProduct");
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productdcategoryInput = document.getElementById("productdcategoryInput");
var productdDesriptionInput = document.getElementById(
  "productdDesriptionInput"
);
var productsBody = document.getElementById("productsBody");
var productContainer = [];

var currentIndex;

if (localStorage.getItem("products") != null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

function addProduct() {
  var product = {
    productName: productNameInput.value,
    productPrice: productPriceInput.value,
    productcategory: productdcategoryInput.value,
    productDesription: productdDesriptionInput.value,
  };
  productContainer.push(product);
  localStorage.setItem("products", JSON.stringify(productContainer));
  clearForm();
  displayProducts();
}
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productdcategoryInput.value = "";
  productdDesriptionInput.value = "";
}
function displayProducts() {
  cartone = ``;
  for (i = 0; i < productContainer.length; i++) {
    cartone += `<tr>   
    <td>${i + 1}</td>
    <td>${productContainer[i].productName}</td>
    <td>${productContainer[i].productPrice}</td>
    <td>${productContainer[i].productcategory}</td>
    <td>${productContainer[i].productDesription}</td>
    <td><button onclick="deleteProduct(${i})" id="Deletebtn" class="btn  btn-outline-danger">Delete</button></td>
    <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
    </tr>`;
  }
  productsBody.innerHTML = cartone;
}
function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts();
}
function updateProduct(Pindex) {
  currentIndex = Pindex;
  productNameInput.value = productContainer[Pindex].productName;
  productPriceInput.value = productContainer[Pindex].productPrice;
  productdcategoryInput.value = productContainer[Pindex].productcategory;
  productdDesriptionInput.value = productContainer[Pindex].productDesription;

  addProductButton.style.display = "none";
  saveChangedProduct.style.display = "block";
}

function savechanges() {
  productContainer[currentIndex].productName = productNameInput.value;
  productContainer[currentIndex].productPrice = productPriceInput.value;
  productContainer[currentIndex].productcategory = productdcategoryInput.value;
  productContainer[currentIndex].productDesription =
    productdDesriptionInput.value;
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts();
  addProductButton.style.display = "block";
  saveChangedProduct.style.display = "none";
  clearForm();
}

function searchInput(term) {
  cartone = ``;
  for (i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].productName.toLowerCase().includes(term.toLowerCase())
    ) {
      cartone += `<tr>   
      <td>${i + 1}</td>
      <td>${productContainer[i].productName}</td>
      <td>${productContainer[i].productPrice}</td>
      <td>${productContainer[i].productcategory}</td>
      <td>${productContainer[i].productDesription}</td>
      <td><button onclick="deleteProduct(${i})" id="Deletebtn" class="btn  btn-outline-danger">Delete</button></td>
      <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
      </tr>`;
    }
    productsBody.innerHTML = cartone;
  }
}

addProductButton.addEventListener("click", addProduct);
saveChangedProduct.addEventListener("click", savechanges);
