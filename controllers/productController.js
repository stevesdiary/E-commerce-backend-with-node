const { v4: uuidv4 } = require('uuid');
const { Product, Variation, Sequelize } = require('../models');
// const { findBySize } = require('./variationController');
const emoji  = require('node-emoji');
const Op = Sequelize.Op;


const productController = {   
  createProduct: async (req, res) => {
    const product_id = uuidv4();
    const variation_id = uuidv4();
    const image_id = uuidv4();
    const productVariation = req.body.variations;
    const {name, category, description, price, discount, in_stock } = req.body;
    try{
      const productData = { product_id: id, variation_id, image_id, name, category, description, price, discount, in_stock};
      const newProduct = await Product.create( productData );
      if(!newProduct) {throw res.status(400).send({Message: `Unable to create ${name} record.`})}
    
      if (Array.isArray(productVariation) && newProduct) {
        let variationsArray = []
        for (let i = 0; i < productVariation.length; i++) {
          const variation = productVariation[i];

          const size = variation.size;
          const quantity = variation.quantity;
          const style = variation.style;
          const colour = variation.colour;

          const newRecord = {
            product_id,
            size,
            colour,
            style,
            quantity
          };
          variationsArray.push(newRecord);
          const variations = await Variation.bulkCreate([newRecord]);
        }
        return res.status(201).send({ Message: 'Product record created with its variations!', Result: {newProduct} });
      }
    }
    catch(err){
      console.log('Error occoured', err)
      res.status(500).send({ Message: 'Oops, error happened', Error: err});
    };
  },

  findAllProducts: async (req, res) => {
    const search = req.query.search;
    const { size, color, style } = req.query;
    const variationWhere = {};
    const queryParams = { size, color, style };
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] !== undefined) {
        variationWhere[key] = queryParams[key];
      }
    });
    let nameCatDescriptionSearch = [];
    if (search) {
      nameCatDescriptionSearch.push({
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { category: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
        ],
      });
    }
    const whereConditions = {
      [Op.and]: [...nameCatDescriptionSearch],
    };
    
    try{
      const totalCount = await Product.count({
        where: whereConditions
      });
      const products = await Product.findAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt'],
        },
        where: whereConditions,
        include: [
          {
            model: Variation,
            as: 'variations',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
            where: variationWhere
          }
        ]
      });
      return res.status(200).send({ Message: 'Records found', Count: totalCount, Product: products })
    }catch(err){
      console.log('An error occoured!', err);
      return res.send({ Message: emoji.emojify('Error showed up :angry-face:'), Error: err.message})
    };
  },

  findOne: async (req, res) => {
    try{
      const product_id = req.params.id;
      
      const product = await Product.findOne({
        where: { product_id }, 
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        },
        include: [
          {
            model: Variation,
            as: 'variations',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
          }
        ]
      });
      return res.status(200).send({ Message: 'Product found', Result: product });
    }catch(err){
      console.log('Error occoured', err)
      res.status(500).send({message: 'Error happened', Error: err.message});
    };
  },
  findBySize: async (req, res) => {
    try{
      const size = req.query.size;
      const product = await Product.findOne({
        where: {size}, 
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
      });
      return res.status(200).send({ message: 'Variation found', Result: product });
    }catch(err){
      console.log('Error occoured', err)
      res.status(500).send({message: 'Error happened', Error: err.message});
    };
  },
  deleteProduct: async (req, res ) => {
    try{
      const product_id = req.params.product_id;
      const product = await Product.destroy({where: {product_id}});
      const message = product === 1
      ? `Product with id ${product_id} has been deleted successfully!`
      : `Product with id ${product_id} does not exist or is deleted in the database`;
      return res.status(200).send({ message });
    }catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err.message})
    }
  },

  updateProduct: async (req, res) => {
  try{
    const product_id = req.params.product_id;
    const {name, description, variation_id, category, price, discount, in_stock } = req.body;
    const updateProduct = await Product.update({name, description, category, price, discount, in_stock }, {where: {product_id}});
    console.log(updateProduct);
    if(updateProduct === 1) {
      return res.status(200).send({ message: 'Record Updated' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({message: 'Error occoured', Error: err.message})
  }
  } 
}

module.exports = productController;