(function () {
  const products = [
    {
      id: "1",
      title: "Baby Yoda",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                expedita obcaecati adipisci explicabo impedit facere est qui
                voluptate. Fugiat libero molestiae suscipit eaque quae nihil sequi
                esse numquam dolor nisi!`,
      image: "img/baby-yoda.svg",
      category: "large",
      price: 10.99,
    },
    {
      id: "2",
      title: "Banana",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                expedita obcaecati adipisci explicabo impedit facere est qui
                voluptate. Fugiat libero molestiae suscipit eaque quae nihil sequi
                esse numquam dolor nisi!`,
      image: "img/banana.svg",
      category: "large",
      price: 9.99,
    },
    {
      id: "3",
      title: "Girl",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                expedita obcaecati adipisci explicabo impedit facere est qui
                voluptate. Fugiat libero molestiae suscipit eaque quae nihil sequi
                esse numquam dolor nisi!`,
      image: "img/girl.svg",
      category: "small",
      price: 8.99,
    },
    {
      id: "4",
      title: "Viking",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                expedita obcaecati adipisci explicabo impedit facere est qui
                voluptate. Fugiat libero molestiae suscipit eaque quae nihil sequi
                esse numquam dolor nisi!`,
      image: "img/viking.svg",
      category: "small",
      price: 12.99,
    },
  ];

  let sortDirection = "ascending";
  let category;

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
                    <button class="button card-button">Buy - ${product.price}</button>
                </div>
            </article>`;
    }
    productsContainer.innerHTML = html;
  }

  renderProducts(products, sortDirection, category);

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
})();
