// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getWatch, getAllWatches } = require('../controllers/watchController');
const { getSneaker, getAllSneakers } = require('../controllers/sneakerController');
const { getRelatedProducts } = require('../controllers/productController');

// Product category routes
router.get('/watches/:id', getWatch);
router.get('/watches', getAllWatches);

router.get('/sneakers/:id', getSneaker);
router.get('/sneakers', getAllSneakers);

router.get('/related-products', getRelatedProducts);

module.exports = router;