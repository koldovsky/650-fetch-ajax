(async function () {
  let sortDirection = "ascending";
  let category;
  let products;
  let currencyRatio = 1;

  async function refreshProducts() {
    const response = await fetch('products.json');
    products = await response.json();
    renderProducts(products, sortDirection, category);
  }

  // function refreshProducts() {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       products = JSON.parse(xhr.responseText);
  //       renderProducts(products, sortDirection, category);
  //     }
  //   }
  //   xhr.open('GET', 'products.json', true);
  //   xhr.send();
  // }

  async function convertCurrency() {
    const responce = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const rates = await responce.json();
    const convertTo = document.querySelector('.currency').value.toUpperCase();
    currencyRatio = rates.rates[convertTo];
    renderProducts(products, sortDirection, category);
  }

  await refreshProducts();

  // setInterval(refreshProducts, 5000);
  
  function renderProducts(products, sortDirection, category) {
    const filteredProducts = products.filter((product) => {
      if (category) {
        return category === product.category;
      } else {
        return true;
      }
    });
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      sortDirection === "ascending" ? a.price - b.price : b.price - a.price
    );
    const productsContainer = document.querySelector(".products");
    let html = "";
    for (const product of sortedProducts) {
      html += `
             <article class="product">
                <img src="${product.image}" alt="${product.title}" />
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="buttons">
                    <button class="button card-button">Info</button>
                    <button class="button card-button">Buy - ${(product.price * currencyRatio).toFixed(2)}</button>
                </div>
            </article>`;
    }
    productsContainer.innerHTML = html;
  }

  const buttonSortAscending = document.querySelector(".sort-asc");
  buttonSortAscending.addEventListener("click", sortAscending);

  function sortAscending() {
    sortDirection = "ascending";
    renderProducts(products, sortDirection, category);
  }

  const buttonSortDescending = document.querySelector(".sort-desc");
  buttonSortDescending.addEventListener("click", sortDescending);

  function sortDescending() {
    sortDirection = "descending";
    renderProducts(products, sortDirection, category);
  }

  function removeSelectedFilterClass() {
      const buttons = document.querySelectorAll('.cat-button');
      for (const button of buttons) {
          button.classList.remove('selected');
      }
  }

  document.querySelector(".cat-large").addEventListener("click", (ev) => {
    // ev.target.style.fontWeight = "bold";
    removeSelectedFilterClass();
    ev.target.classList.add('selected');
    category = "large";
    renderProducts(products, sortDirection, category);
  });
  document.querySelector(".cat-small").addEventListener("click", (ev) => {
    removeSelectedFilterClass();
    ev.target.classList.add('selected');  
    category = "small";
    renderProducts(products, sortDirection, category);
  });
  document.querySelector(".cat-all").addEventListener("click", (ev) => {
    removeSelectedFilterClass();
    ev.target.classList.add('selected');  
    category = null;
    renderProducts(products, sortDirection, category);
  });

  document.querySelector('.refresh-products').addEventListener('click', refreshProducts);
  document.querySelector('.convert').addEventListener('click', convertCurrency);

})();
