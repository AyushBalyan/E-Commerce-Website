const sql = require('../db/db');

const getRelatedProducts = async (category, productId, tags) => {
    const tagArray = tags.split(',');
    
    try {
      // For sneakers
      if (category === 'sneakers') {
        const related = await sql`
          SELECT DISTINCT s.id, s.name, s.brand, s.image_url_1,
                 (SELECT MIN(price) FROM sneaker_sizes WHERE sneaker_id = s.id) as min_price
          FROM sneakers s
          JOIN product_tags pt ON s.id = pt.product_id
          WHERE pt.tag = ANY(${tagArray})
          AND s.id != ${productId}
          LIMIT 10
        `;
        return related;
      }
      
      // For watches
      if (category === 'watches') {
        const related = await sql`
          SELECT DISTINCT w.id, w.name, w.brand, w.image_url_1, w.price as min_price
          FROM watches w
          JOIN product_tags pt ON w.id = pt.product_id
          WHERE pt.tag = ANY(${tagArray})
          AND w.id != ${productId}
          LIMIT 10
        `;
        return related;
      }
      
      return [];
    } catch (error) {
      throw error;
    }
  };

  module.exports = {
    getRelatedProducts,
  };