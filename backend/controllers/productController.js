const watchModel = require('../models/watchModel');
const sneakerModel = require('../models/sneakerModel');

const getRelatedProducts = async (req, res) => {
  try {
    const { category, productId, tags } = req.query;
    console.log("Query params:", { category, productId, tags }); // Debug log
    
    const tagsArray = tags.split(',');
    console.log("Tags array:", tagsArray); // Debug log
    
    let relatedProducts = [];
    
    if (category === 'watches') {
      relatedProducts = await watchModel.getRelatedWatches(productId, tagsArray);
    } else if (category === 'sneakers') {
      relatedProducts = await sneakerModel.getRelatedSneakers(productId, tagsArray);
    }

    console.log("Found related products:", relatedProducts); // Debug log
    res.json({ relatedProducts });
  } catch (error) {
    console.error('Error in getRelatedProducts:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRelatedProducts
};
