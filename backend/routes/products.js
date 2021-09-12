const express =require("express")
const router = express.Router();
const {getProducts,newProduct,getSingleProduct,updateSingleProduct,deleteSingleProduct} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth");

router.route('/products').get(isAuthenticatedUser,authorizeRoles('admin'),getProducts);
router.route('/admin/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct)
router.get('/products/:id',getSingleProduct)
router.route('/admin/products/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateSingleProduct).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteSingleProduct)

module.exports = router 