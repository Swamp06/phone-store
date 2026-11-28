import Product from "../models/Product.js";

export default new class ProductController{
    async CreateProduct(req , res){
        try {
            const{brand , model , title , 
                description , price , quantity , 
                storage , color , screen , 
                camera , battery , os , cpu , ram} = req.body

            const newProduct = await Product.create({brand , model , title , 
                                                    description , price , quantity , 
                                                    storage , color , specs: {screen , 
                                                    camera , battery , os , cpu , ram}})
            res.status(200).json(newProduct)                                       
    }catch(err){
        console.log("Ошибка при добавлении товара: " + err);
        
    }
    }

    async GetProducts(req , res){
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (err) {
            console.log("Ошибка при получении товаров: " + err);
            
        }
    }
    
    async GetProduct(req , res){
        try {
            const {id} = req.params
            const product = await Product.findById(id)
            res.status(200).json(product)
        } catch (err) {
            console.log("Ошибка при получении товара: " + err);
        }
    }

    async DeleteProduct(req,res){
        try {
            const {id} = req.params
            const product = await Product.findByIdAndDelete(id)
            res.status(200).json(product)
        } catch (err) {
            console.log("Ошибка при удалении товара: " + err);
        }
    }
}
