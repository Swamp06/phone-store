import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productRouter = Router()

productRouter.post("/addproduct" , ProductController.CreateProduct)
productRouter.get("/getproducts" , ProductController.GetProducts)
productRouter.get("/getproduct/:id" , ProductController.GetProduct)
productRouter.get("/deleteproduct/:id" , ProductController.DeleteProduct)

export default productRouter