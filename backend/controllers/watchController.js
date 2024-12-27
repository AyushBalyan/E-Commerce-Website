// backend/controllers/sneakerController.js
const watchModel = require('../models/watchModel');

const getWatch = async (req, res) => {
  try {
    const watch = await watchModel.getWatchById(req.params.id);
    // const sizes = await sneakerModel.getSneakerSizes(req.params.id);
    const productData = {
        ...watch,
        min_price: watch.min_price || watch.price
    }
    res.json({ 
        product: productData,
        sizes: [] 
      });
  } catch (error) {
    console.error('Error in getWatch:', error);
    res.status(500).json({ error: error.message });
  }
};

const getAllWatches = async (req, res) => {
  try {
    const watches = await watchModel.getAllWatches();
    const watchesWithPrice = watches.map(watch => ({
        ...watch,
        min_price: watch.min_price || watch.price
      }));
    res.status(200).json(watches);
  } catch (error) {
    console.error('Error in getAllWatches:', error);
    res.status(500).json({ error: "Failed to fetch watches" });
  }
};

module.exports = {
  getWatch,
  getAllWatches,
};