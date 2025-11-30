import Storage from "./Storage.js";

const addNewCategoryBtn = document.querySelector("#add-new-category");
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-desc");
const productCategoriesDom = document.querySelector("#product-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList(this.categories);
    categoryTitle.value = "";
    categoryDescription.value = "";
  }
  createCategoriesList(categories) {
    let result = `<option class="bg-slate-500 text-slate-300" value="">
                  select a category
                </option>`;

    categories.forEach(
      (category) =>
        (result += `<option class="bg-slate-500 text-slate-300" value=${category.id}>
                  ${category.title}
                </option>`)
    );
    productCategoriesDom.innerHTML = result;
  }
  getCategories() {
    this.categories = Storage.getAllCategories();
  }
}

export default new CategoryView();
