// backend/controllers/sneakerController.js
const sneakerModel = require('../models/sneakerModel');

const getSneaker = async (req, res) => {
  try {
    const sneaker = await sneakerModel.getSneakerById(req.params.id);
    const sizes = await sneakerModel.getSneakerSizes(req.params.id);
    res.json({ 
      product: sneaker, 
      sizes });
  } catch (error) {
    console.error('Error in getSneaker:', error);
    res.status(500).json({ error: error.message });
  }
};

const getAllSneakers = async (req, res) => {
  try {
    const sneakers = await sneakerModel.getAllSneakers();
    res.status(200).json(sneakers);
  } catch (error) {
    console.error('Error in getAllSneakers:', error);
    res.status(500).json({ error: "Failed to fetch sneakers" });
  }
};

module.exports = {
  getSneaker,
  getAllSneakers,
};