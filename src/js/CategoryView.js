import Storage from "./Storage.js";

const addNewCategoryBtn = document.querySelector("#add-new-category");
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-desc");
const productCategoriesDom = document.querySelector("#product-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const cancleAddCategoryBtn = document.querySelector("#cancle-add-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancleAddCategoryBtn.addEventListener("click", (e) =>
      this.cancleAddCategory(e)
    );

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
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
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
   toggleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }
  cancleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }
}

export default new CategoryView();
