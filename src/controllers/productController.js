const Product = require("../models/productModel");
const uploadImage = require("../libs/cloudinary");


async function getAllProducts(req, res) {
	try {
		const products = await Product.find({});
		res.status(200).send(products);
	} catch (error) {
		res.status(500).send(error);
	}
};
async function createProduct(req, res) {
	try {
		const { name, description, price, quantity, image } = req.body;
    console.log(`files: ${req.file}`);
		const product = new Product({ 
      name,
      description, 
      price, 
      quantity,
      image
    });

    console.log(product);

		if (req.files?.image) {
			const result = await uploadImage(req.files.image.tempFilePath);
      console.log(`result: ${result}`);
    }
    
    await product.save();
		res.status(201).send(product);
	} catch (error) {
		res.status(400).send(error);
	}
};

async function getProductById(req, res) {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).send({
        message: 'Producto no encontrado'
      });
		}
		res.status(200).send(product);
	} catch (error) {
		res.status(500).send(error);
	}
};
async function updateProductById(req, res) {
	try {

    const {id} = req.params;
    const productUpdated = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    })
	/*
    const { name, description, price, quantity } = req.body;

		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{ name, description, price, quantity, image },
			{ new: true, runValidators: true }
		);
*/

		if (!productUpdated) {
			return res.status(404).send();
		}
		res.status(200).send(productUpdated);
	} catch (error) {
		res.status(400).send(error);
	}
};
async function deleteProductById(req, res){
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) {
			return res.status(404).send({
          message: 'Producto no encontrado'
      });
		}
		res.status(200).send(product);
	} catch (error) {
		res.status(500).send(error);
	}
};


module.exports = {getAllProducts, createProduct, getProductById, updateProductById, deleteProductById }