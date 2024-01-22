// store all object of each element in this array
var productsList = [];

//select all inputs
var pName = document.getElementById("proName");
var pPrice = document.getElementById("proPrice");
var pModel = document.getElementById("proModel");
var pDesc = document.getElementById("proDesc");
var search = document.getElementById("search");
// selected Buttons
var addBtn = document.getElementById("addBtn");
var UpBtn = document.getElementById("UpBtn");

// global variables
var selectdProduct = null;
var isSearch = false;

// set Data in local storage
function setDataInLocalStorage(x) {
  localStorage.setItem("products", JSON.stringify(x));
}

// get Data in local storage
function getDataInLocalStorage() {
  productsList = JSON.parse(localStorage.getItem("products"));
}

// Display Product If exist in localstorage
if (localStorage.getItem("products") != null) {
  getDataInLocalStorage();
  display(productsList);
}

var id = productsList.length;

// updateInputsValue after add or update product
function updateInputsValue(ele) {
  pName.value = ele ? ele.name : "";
  pPrice.value = ele ? ele.price : "";
  pModel.value = ele ? ele.model : "";
  pDesc.value = ele ? ele.desc : "";
}

// create product
function add() {
  if (validateName() && validateDesc() && validatePrice() && validateModel) {
    // get Data from inputs
    var product = {
      name: pName.value,
      price: pPrice.value,
      model: pModel.value,
      desc: pDesc.value,
      id: id++,
    };

    // Add product to array
    productsList.push(product);

    // invok display func
    display(productsList);

    // Set Data in LocalStorage
    setDataInLocalStorage(productsList);

    // clear inputs
    updateInputsValue();
  }
}

// display product at document
function display(data) {
  var cartona = ``;
  if (data.length !== 0) {
    for (var i = 0; i < data.length; i++) {
      cartona += `  <tr>
        <td>${i + 1}</td>
        <td>${data[i].newName ? data[i].newName : data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].model}</td>
        <td>${data[i].desc}</td>
        <td><button onClick="setFormToUpdate(${
          data[i].id
        })" class="btn btn-warning">Update</button></td>
        <td><button onClick="DeletProduct(${
          data[i].id
        })" class="btn btn-danger">Delete</button></td>
    </tr>`;
    }
  } else {
    cartona += `<tr>
    <td colspan="7"> <p class="null-search">There is no product to display</p> </td>
</tr>`;
  }

  //   insert rows of data in my document
  document.getElementById("myData").innerHTML = cartona;
}

// Delet Product
function DeletProduct(id) {
  for (var i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      var ret = productsList.splice(productsList.indexOf(productsList[i]), 1);
    }
  }

  // seteproducts in local storage
  setDataInLocalStorage(productsList);

  // Show Product
  display(productsList);

  //clear input search value
  search.value = "";
}

// SEARCH FUNCTION
function searching(searchKey) {
  var searchedProduct = [];
  for (var i = 0; i < productsList.length; i++) {
    if (
      productsList[i].name.toLowerCase().includes(searchKey.toLowerCase()) ===
      true
    ) {
      productsList[i].newName = productsList[i].name
        .toLowerCase()
        .replace(
          searchKey.toLowerCase(),
          `<span class="text-danger">${searchKey}</span>`
        );
      searchedProduct.push(productsList[i]);
    }
  }

  display(searchedProduct);
}

// Set Form to Update
function setFormToUpdate(id) {
  UpBtn.classList.replace("d-none", "d-block");
  addBtn.classList.replace("d-block", "d-none");

  for (var i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      selectdProduct = productsList[i];
      updateInputsValue(selectdProduct);
    }
  }
}

//  Update Product
function Update() {
  addBtn.classList.replace("d-none", "d-block");
  UpBtn.classList.replace("d-block", "d-none");

  var product = {
    name: pName.value,
    price: pPrice.value,
    model: pModel.value,
    desc: pDesc.value,
  };

  // update value
  productsList.splice(productsList.indexOf(selectdProduct), 1, product);

  // update product in table
  display(productsList);

  // update product in local storage
  setDataInLocalStorage(productsList);

  // updateInputsValue inputs
  updateInputsValue();

  //clear input search value to remove searched character but it's not the problem
  search.value = null;
}

// Validation Function
function validateName() {
  var regex = /^[A-Z][a-z]{2,8}$/;

  if (regex.test(pName.value) === true) {
    document.getElementById("wrongName").classList.add("d-none");
    pName.style.border = "none";
    return true;
  } else {
    pName.style.border = "4px solid darkred";
    document.getElementById("wrongName").classList.remove("d-none");
    return false;
  }
}

function validatePrice() {
  var regex = /^[1-9][0-9]{3}|10000$/;
  if (regex.test(pPrice.value) === true) {
    document.getElementById("wrongPrice").classList.add("d-none");
    pPrice.style.border = "none";
    return true;
  } else {
    document.getElementById("wrongPrice").classList.remove("d-none");
    pPrice.style.border = "4px solid darkred";
    return false;
  }
}

function validateModel() {
  var regex = /^(tv|mobile|labtop)$/;

  if (regex.test(pModel.value) === true) {
    document.getElementById("wrongModel").classList.add("d-none");
    pModel.style.border = "none";
    return true;
  } else {
    document.getElementById("wrongModel").classList.remove("d-none");
    pModel.style.border = "4px solid darkred";
    return false;
  }
}

function validateDesc() {
  var regex = /^.{10,1000}$/;
  if (regex.test(pDesc.value) === true) {
    document.getElementById("wrongDesc").classList.add("d-none");
    pDesc.style.border = "none";
    return true;
  } else {
    document.getElementById("wrongDesc").classList.remove("d-none");
    pDesc.style.border = "4px solid darkred";
    return false;
  }
}