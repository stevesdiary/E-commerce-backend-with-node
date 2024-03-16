const { v4: uuidv4 } = require('uuid');
const { Product, Variation } = require('../models');
const price = require('../models/price');

const productController = {
  createProduct: async (req, res) => {
  // Create a new product
    const {name, description, price, } = req.body;
    const newProduct = await Product.create({
      name,
      description
    });

  //   // Create a price record
  //   const price = await Price.create({
  //     price: 50.00,
  //     discountPrice: 40.00,
  //     salePrice: 45.00,
  //     currency: 'USD',
  //   });

  //   // Create a quantity record
  //   const quantity = await Quantity.create({ quantity: 100 });

  //   // Associate the product with Colour, size, price, and quantity
  //   await newProduct.addColor(Colour);
  //   await newProduct.addSize(size);
  //   await newProduct.addPrice(price);
  //   await newProduct.addQuantity(quantity);

  //   // Retrieve the product with its associated attributes
  //   const productWithAttributes = await Product.findByPk(newProduct.id, {
  //     include: [
  //       { model: Colour },
  //       { model: Size },
  //       { model: Price },
  //       { model: Quantity },
  //     ],
  //   });
  //   console.log(productWithAttributes);
  },
    
  createProduct: async (req, res) => {
    const id = uuidv4();
    const variation_id = uuidv4();
    const image_id = uuidv4();
    const {productVariation} = req.body.variations;
    try{
      const {name, category, description, in_stock } = req.body;
      const productData = {id, variation_id, image_id, name, category, description, in_stock};
      const newProduct = await Product.create({ productData });
      if(!newProduct) {throw res.status(404).send({Message: `Unable to create record for ${name}`})}
      
      if (Array.isArray(productVariation)) {
        try {
          for (let i = 0; i < productVariation.length; i++) {
            let variations = [];
            const size = productVariation[i].size;
            const colour = productVariation[i].colour;
            const pattern = productVariation[i].pattern;

            if (
              size.length > 1 ||
              colour.length > 1 ||
              pattern.length > 1
              ) {
              
              // req.body.variation[i].id = variation_id;
              // req.body.product[i].id = id;
              const newRecord = {
                id: variation_id,
                product_id: id,
                size: size,
                colour: colour,
                pattern: pattern
              };
              variations.push(newRecord);
            }
          }
        }
        catch(err){
          return res.status(404).send({ Message: 'Error ocoured', Error: err })
        }
      }
    }
    catch(err){
      console.log('Error occoured', err)
      res.status(500).send({message: 'Error happened', Error: err.message});
    };
  },

  findAllProducts: async (req, res) => {
    try{
      const products = await Product.findAndCountAll({
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
        }
      });
      // console.log('Records found', products)
      return res.status(200).send({message: 'Records found', products})
    }catch(err){
      console.log('An error occoured!', err);
      return res.send({message: 'Error showed up', Error: err.message})
    };
  },

  findOne: async (req, res) => {
    try{
      const id = req.params.id;
      const product = await Product.findOne({
        where: {id}, 
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
      });
      console.log('product found', product);
      return res.status(200).send({message: 'Product found', product });
    }catch(err){
      console.log('Error occoured', err)
      res.status(500).send({message: 'Error happened', Error: err.message});
    };
  },

  deleteProduct: async (req, res ) => {
    try{
      const id = req.params.id;
      console.log("IDDDD", id)
      const product = await Product.destroy({where: {id}})
      // console.log(user)
      if (product == 1 ){
        return res.send({message: `User with id ${id} has been deleted successfully!`})
      }
      if(user == 0){
        return res.send({message: `User ${id} does not exist or is deleted in the database`})
      }
    }catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err.message})
    }
  },

  updateProduct: async (req, res) => {
  try{
    const id = req.params.id;
    const {name, address, email, phone_number, type } = req.body;
    const updateProduct = await User.update({name, address, email, phone_number, type }, {where: {id}});
    console.log(updateProduct);
    if(updateProduct == 1) {
      return res.status(200).send({ message: 'Record Updated' });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({message: 'Error occoured', Error: err.message})
  }
  }
  
}

module.exports = productController;