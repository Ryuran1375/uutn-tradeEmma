const Product = require('../models/products');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const { txtname, txtprice, txtDes, txtDet } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = new Product({
      name: txtname,
      price: txtprice,
      description: txtDes,
      status: txtDet,
      image
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};
