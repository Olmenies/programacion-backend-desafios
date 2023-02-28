"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const path = __importStar(require("path"));
// Class ProductManager
class ProductManager {
    constructor() {
        this.dataFile = path.resolve(__dirname, "../assets/dataFile.json");
    }
    getAllProds() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.readDataFile();
        });
    }
    getProdByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prodArray = yield this.readDataFile();
            const prod = prodArray === null || prodArray === void 0 ? void 0 : prodArray.find((el) => el.id === id);
            if (prod)
                return prod;
            else
                return "No product found";
        });
    }
    addNewProd(prod) {
        return __awaiter(this, void 0, void 0, function* () {
            const prodArray = yield this.readDataFile();
            const tempProd = Object.assign(Object.assign({}, prod), { id: yield this.generateID(prodArray) });
            console.log(prodArray);
            if (prodArray) {
                prodArray.push(tempProd);
                this.saveToFile(prodArray);
            }
        });
    }
    generateID(prodArray) {
        return __awaiter(this, void 0, void 0, function* () {
            //const prodArray = await this.readDataFile();
            if (prodArray) {
                if (prodArray.length === 0) {
                    return 0;
                }
                else {
                    const lastProdId = prodArray[prodArray.length - 1].id;
                    if (typeof lastProdId === "number") {
                        return lastProdId + 1;
                    }
                }
            }
        });
    }
    readDataFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileContentRaw = yield fs_1.promises.readFile(this.dataFile, "utf-8");
                const fileContent = JSON.parse(fileContentRaw);
                return fileContent;
            }
            catch (err) {
                console.log(err);
                return [];
            }
        });
    }
    saveToFile(prodArray) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.writeFile(this.dataFile, JSON.stringify(prodArray));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
// Main program
const myProdManager = new ProductManager();
//myProdManager.getAllProds().then((res) => console.log(res));
//myProdManager.getProdByID(0).then(res => console.log(res));
//my ProdManager.getProdByID(100).then(res => console.log(res));
myProdManager.addNewProd({
    title: "Betta",
    description: "El pez betta o luchador de Siam (Betta splendens) es una especie de pez de agua dulce de la familia de los Osphronemidae en el orden de los Perciformes.",
    price: 500,
    thumbnail: "/assets/betta.jpg",
    code: (0, uuid_1.v4)(),
    stock: 50,
});
