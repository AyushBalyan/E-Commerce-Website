// backend/models/watchModel.js
const sql = require('../db/db');

const getWatchById = async (id) => {
  try {
    const watch = await sql`
      SELECT id, name, brand, description, image_url_1, image_url_2, image_url_3, image_url_4, stock_quantity, price as min_price, tags
      FROM watches 
      WHERE id = ${id}
    `;

    if (watch.length === 0) {
      throw new Error('Watch not found');
    }

    return watch[0];
  } catch (error) {
    throw error;
  }
};

// const getSneakerSizes = async (id) => {
//   try {
//     const sizes = await sql`
//       SELECT size, price, stock_quantity 
//       FROM sneaker_sizes 
//       WHERE sneaker_id = ${id}
//     `;

//     return sizes;
//   } catch (error) {
//     throw error;
//   }
// };

const getAllWatches = async () => {
  try {
    const watches = await sql`
      SELECT w.id, w.name, w.brand, w.image_url_1, w.stock_quantity, w.price as min_price
      FROM watches w
    `;
    return watches;
  } catch (error) {
    throw error;
  }
};

const getRelatedWatches = async (productId, tags) => {
  try {
    console.log("Searching for related watches:", { productId, tags }); // Debug log
    
    const relatedWatches = await sql`
      SELECT DISTINCT w.id, w.name, w.brand, w.image_url_1, w.price as min_price
      FROM watches w
      WHERE w.id != ${productId}
      AND string_to_array(w.tags, ',') && ${sql.array(tags)}
      LIMIT 4
    `;
    
    console.log("Found watches:", relatedWatches); // Debug log
    return relatedWatches;
  } catch (error) {
    console.error("SQL Error:", error);
    throw error;
  }
};

module.exports = {
  getWatchById,
  getRelatedWatches,
  getAllWatches,
};