import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  // get products and categories
  CategoryView.getCategories();
  ProductView.getProducts()
  
  // create categories option and products
  CategoryView.createCategoriesList(CategoryView.categories);
  ProductView.createProductsList(ProductView.products)

   
});

