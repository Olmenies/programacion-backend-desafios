// Imports
import { v4 as uuidv4 } from "uuid";
import { promises as fsPromises } from "fs";
import * as path from "path";

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
  private dataFile = path.resolve(__dirname, "../assets/dataFile.json");

  public async getAllProds() {
    return await this.readDataFile();
  }

  public async getProdByID(id: number) {
    const prodArray = await this.readDataFile();
    const prod = prodArray?.find((el) => el.id === id);
    if (prod) return prod;
    else return "No product found";
  }

  public async addNewProd(prod: Product) {
    const prodArray = await this.readDataFile();
    const tempProd = { ...prod, id: await this.generateID(prodArray) };
    if (prodArray) {
      prodArray.push(tempProd);
      this.saveToFile(prodArray);
    }
  }

  public async updateProdById(id:number, updatedProd: Product) {
    const prodArray = await this.readDataFile();
    const updatedArray = prodArray.map(el => {
      if(el.id !== id) {
        return el
      } else {
        return updatedProd
      }
    });
    this.saveToFile(updatedArray);
  }

  private async generateID(prodArray: Product[]) {
    if (prodArray) {
      if (prodArray.length === 0) {
        return 0;
      } else {
        const lastProdId = prodArray[prodArray.length - 1].id;
        if (typeof lastProdId === "number") {
          return lastProdId + 1;
        }
      }
    }
  }

  private async readDataFile() {
    try {
      const fileContentRaw = await fsPromises.readFile(this.dataFile, "utf-8");
      const fileContent: Product[] = JSON.parse(fileContentRaw);
      return fileContent;
    } catch (err) {
      console.log(err);
      return []
    }
  }

  private async saveToFile(prodArray: Product[]) {
    try {
      await fsPromises.writeFile(this.dataFile, JSON.stringify(prodArray));
    } catch (err) {
      console.log(err);
    }
  }
}

// Main program
const myProdManager = new ProductManager();

//myProdManager.getAllProds().then((res) => console.log(res));
//myProdManager.getProdByID(0).then(res => console.log(res));
//my ProdManager.getProdByID(100).then(res => console.log(res));
myProdManager.addNewProd({
  title: "Betta",
  description:
    "El pez betta o luchador de Siam (Betta splendens) es una especie de pez de agua dulce de la familia de los Osphronemidae en el orden de los Perciformes.",
  price: 500,
  thumbnail: "/assets/betta.jpg",
  code: uuidv4(),
  stock: 50,
});
myProdManager.updateProdById(0, {
  title: "Ancystrus",
  description:
    "El nombre ancistrus viene del griego 'agkistron' que significa gancho - una referencia a la forma de los odontoides (dientes dérmicos) de la mejilla.",
  price: 200,
  thumbnail: "/assets/ancystrus.jpg",
  code: uuidv4(),
  stock: 50,
})
