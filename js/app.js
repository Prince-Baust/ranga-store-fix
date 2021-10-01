fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>showProducts(json))

// show all product in UI 
const showProducts = (products) => {
  for (const product of products) {
    // Creating Product Cards
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
<div class="card single-product">
        <img class="product-image card-img-top mx-auto" src=${product.image} alt="Product Image">
        <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-text">Category: ${product.category}</p>
            <i class="fas fa-star"></i> ${product.rating.rate}
            <i class="fas fa-user-friends"></i> ${product.rating.count}
            <h2>Price: $ ${product.price}</h2>
        </div>
        <div class="card-footer">
            <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success ms-4">add to cart</button>
            
            <button onclick="loadDetails(${product.id})" id="details-btn" class="btn btn-info ms-4">Details</button>
        </div>
</div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (price) => {
  count++;
  updatePrice(price);
  updateTaxAndCharge();
  updateTotal();
  setInnerText('total-Products', count);
};

const loadDetails = id => {
  fetch('https://fakestoreapi.com/products/'+id)
      .then(res=>res.json())
      .then(json=>showDetails(json))
}

const showDetails = (product) => {
  document.querySelector('#single-detail').innerHTML = ``;
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `
<div class="card single-product text-center">
        <img class="product-image card-img-top mx-auto" src=${product.image} alt="Product Image">
        <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-text">Category: ${product.category}</p>
            <i class="fas fa-star"></i> ${product.rating.rate}
            <i class="fas fa-user-friends"></i> ${product.rating.count}
            <h2>Price: $ ${product.price}</h2>
        </div>
        <div class="card-footer">
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
            
            <button onclick="loadDetails(${product.id})" id="details-btn" class="btn btn-info ms-5">Details</button>
        </div>
        </div>
      `;
  document.querySelector('#single-detail').appendChild(div);
}


const getInputValue = id => parseFloat(document.getElementById(id).innerText);

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2)+'';
};

// main price update function
const updatePrice = (value) => {
  const oldPrice = getInputValue('price');
  const newPrice = parseFloat(value);
  const total = (oldPrice + newPrice).toFixed(2);
  document.getElementById('price').innerText = total+'';
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const price = getInputValue("price");
  if (price > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", price * 0.2);
  }
  if (price > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", price * 0.3);
  }
  if (price > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", price * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  setInnerText('total', grandTotal)
};
