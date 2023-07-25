const router = require('express').Router();
const {
    products,
    productById,
    createProduct,
    updateProduct,
    deleteProductById
} = require('../controllers/productControllers');

const {
    validateToken,
    validateRol,
    validateProductParams,
    validateProductId,
    validateSesionUser
} = require('../middlewares/middlewares');

router.get('/', products);
router.post('/admin', [validateToken, validateSesionUser, validateRol], createProduct)
router.get('/:idProduct', productById);
router.put('/admin/:idProduct', [validateToken, validateSesionUser, validateRol, validateProductId, validateProductParams], updateProduct);
router.delete('/admin/:idProduct', [validateToken, validateSesionUser, validateRol, validateProductId], deleteProductById);

module.exports = router;