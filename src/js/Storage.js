export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedCategories;
  }
  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    return savedProducts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  static savedCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    // edit => save...
    // new ->  save...
    const existedCategory = savedCategories.find(
      (c) => c.id === categoryToSave.id
    );
    if (existedCategory) {
      // edit
      existedCategory.title = categoryToSave.title;
      existedCategory.description = categoryToSave.description;
    } else {
      // new
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
    }
    savedCategories.push(categoryToSave);
  }

  static saveProduct(productToSave) {
    const savedProducts = Storage.getAllProducts();
    // edit => save...
    // new  => save...

    const existedItem = savedProducts.find((p) => p.id === productToSave.id);
    if (existedItem) {
      // edit
      existedItem.title = productToSave.title;
      existedItem.category = productToSave.category;
      existedItem.quantity = productToSave.quantity;
    } else {
      // new
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString(
        savedProducts.push(productToSave)
      );
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
}
