import Storage from "./Storage.js";

const addNewProductBtn = document.querySelector("#add-new-product");
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const searchInput = document.querySelector("#search-input");
const sortInput = document.querySelector("#sort-input");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    sortInput.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) return;
    Storage.saveProduct({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    productTitle.value = "";
    productQuantity.value = "";
    productCategory.value = "";
  }

  createProductsList(products) {
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      result += `<div class="flex items-center justify-between mb-2">
                <span class="text-slate-400">${item.title}</span>
                <div class="flex items-center gap-x-3">
                  <span class="text-slate-400">${new Date(
                    item.createdAt
                  ).toLocaleDateString("fa-IR")}</span>
                  <span
                    class="border border-slate-400 rounded-2xl text-sm text-slate-400 px-3 py-0.5"
                    >${selectedCategory.title}</span
                  >
                  <span
                    class="border-2 border-slate-300 rounded-full w-7 h-7 flex items-center justify-center text-slate-300"
                    >${item.quantity}</span
                  >
                  <button
                    data-id=${item.id}
                    class="px-3 py-0.5 rounded-2xl border border-red-500 text-red-500 text-sm"
                  >
                    delete
                  </button>
                </div>
              </div>`;
    });
    const productsListDom = document.querySelector("#products-list");
    productsListDom.innerHTML = result;
  }
  getProducts() {
    this.products = Storage.getAllProducts();
  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();

    const filteredProducts = Storage.getAllProducts().filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }
  sortProducts(e) {
    const selectedSort = e.target.value;
    let sortedProducts = [];
    if (selectedSort === "newest") {
      sortedProducts = this.products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else {
      sortedProducts = this.products.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    this.createProductsList(sortedProducts);
  }
}

export default new ProductView();
