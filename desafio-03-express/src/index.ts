//Imports
import express from "express";
import { ProductManager } from "./models/productManagerModel";
import { v4 as uuidv4 } from "uuid";

// Constants and definitions
const myProdManager = new ProductManager();
const PORT = 8080 || process.env.port;

// Express server definition
const app = express();

// Server listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Endpoints
app.get("/", (req, res) => {
  res.json({ msg: "GET made to /" });
});

app.get("/products/", async (req, res) => {
  const productList = await myProdManager.getAllProds();
  const limit = parseInt(req.query.limit as string);
  const pid = parseInt(req.query.pid as string);

  // Return a product if pid param is defined
  if (pid) {
    const foundProd = productList.find((el) => el.id === pid);
    res.status(200).json(foundProd);
    // Define the amount of elements to be returned if limit param is defined
  } else if (limit) {
    res.status(200).json(productList.slice(0, limit));
  } else {
    res.status(200).json(productList);
  }
});
