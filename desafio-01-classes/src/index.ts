// Imports
import { v4 as uuidv4 } from "uuid";

//Interface Product
interface Product {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  code: string;
  stock: number;
  id?: number;
}

// Class ProductManager
class ProductManager {
  protected productsArray: Product[] = [];

  public getAllProds(): Product[] {
    return this.productsArray;
  }

  public getProdByID(id: number): Product | string {
    const prod = this.productsArray.find((el) => el.id === id);
    if (prod) {
      return prod;
    } else {
      return "No product found";
    }
  }

  public addNewProd(prod: Product) {
    const tempProd = { ...prod, id: this.generateID() };
    this.productsArray.push(tempProd);
  }

  protected generateID() {
    if (this.productsArray.length === 0) {
      return 0;
    } else {
      const lastProdId = this.productsArray[this.productsArray.length - 1].id;
      if (typeof lastProdId === "number") {
        return lastProdId + 1;
      }
    }
  }
}

// Main program
const myProdManager = new ProductManager();
console.log(myProdManager.getAllProds());
myProdManager.addNewProd({
  title: "Betta",
  description:
    "El pez betta o luchador de Siam (Betta splendens) es una especie de pez de agua dulce de la familia de los Osphronemidae en el orden de los Perciformes.",
  price: 500,
  thumbnail: "/assets/betta.jpg",
  code: uuidv4(),
  stock: 50,
});
console.log(myProdManager.getAllProds());
console.log(myProdManager.getProdByID(0));
console.log(myProdManager.getProdByID(10));