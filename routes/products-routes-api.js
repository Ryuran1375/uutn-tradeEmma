const express = require('express');
const router = express.Router();
const productsController = require('../contollers/products-controller');
const multer = require('multer');

// Configuración de `multer`
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio de destino para los archivos subidos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage: storage });

// Ruta para obtener todos los productos
router.get('/getProducts', productsController.getProducts);

// Ruta para crear un nuevo producto con carga de imagen
router.post('/createProduct', upload.single('txtimage'), productsController.createProduct);

module.exports = router;