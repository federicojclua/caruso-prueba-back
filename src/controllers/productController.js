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
		const { name, description, price, quantity } = req.body;

		if (!name) {
			return res.status(400).json({
				message: 'El campo Nombre es necesario',
			});
		}

		if (!description) {
			return res.status(400).json({
				message: 'El campo Descripcion es necesario'
			});
		}

		if (!price) {
			return res.status(400).json({
				message: 'El campo Precio es necesario'
			});
		}

		if (!quantity) {
			return res.status(400).json({
				message: 'El campo Cantidad es necesario'
			});
		}

		let image = null;
		if (req.files && req.files.image) {
			const result = await uploadImage(req.files.image.tempFilePath);
			image = result.secure_url;
      console.log(image);
		}

		const newProduct = new Product({
			name,
			description,
			price,
			quantity,
			image
		});

		await newProduct.save();

		res.status(201).send({
			message: 'Producto creado exitosamente',
			product: newProduct
		});
	} catch (error) {
		res.status(400).send(error);
		console.log(error);
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
		const { id } = req.params;
		const { name, description, price, quantity } = req.body;

		const updatedData = { name, description, price, quantity };

		if (req.files && req.files.image) {
			const result = await uploadImage(req.files.image.tempFilePath);
			updatedData.image = result.secure_url;
		}

		const productUpdated = await Product.findByIdAndUpdate(id, updatedData, {
			new: true
		});

		if (!productUpdated) {
			return res.status(404).send();
		}
		res.status(200).send(productUpdated);
	} catch (error) {
		res.status(400).send(error);
	}
};

async function deleteProductById(req, res) {
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

module.exports = { getAllProducts, createProduct, getProductById, updateProductById, deleteProductById };