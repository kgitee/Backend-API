const { Router } = require('express');
const productController = require('../controllers/product');
const auth = require('../middleware/auth');
const router = express.Router();

//router.get('/', productController.get_products);

router.get('/', (req, res) => {
	productController.getProducts().then(resultFromController => res.send(resultFromController))
})

//create new product
//router.post('/',productController.post_product);
router.post('/', auth.verify, (req, res) => {
	if(auth.decode(req.headers.authorization).isAdmin){
		productController.addProduct(req.body).then(resultFromController => res.send(resultFromController))
	}else{
		res.send(false)
	}
});
router.put('/products/:id',productController.update_product);
router.delete('/products/:id',productController.delete_product);

module.exports = router;