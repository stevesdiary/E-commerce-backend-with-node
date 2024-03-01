const { v4: uuidv4 } = require('uuid');
const { Product, Variation } = require('../models');

const productController = {

  // createProduct: async (req, res) => {
  // // Create a new product
  //   const {name, description} = req.body;
  //   const newProduct = await Product.create({
  //     name,
  //     description
  //   });

  //   // Create or find Colour, size, and other attributes
  //   const {colour} = req.body.colours;
  //   const Colour = await Colour.findOrCreate({ where: colour });
  //   const size = await Size.findOrCreate({ where: { name: 'Large' } });

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
  // },
    


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
    
      const variation = await Variation.create({ id: variation_id, productVariation });
      if(!variation) throw res.status(404).send({Message: 'Unable to create variations'});
      console.log('Variations created successfully', variation);
      const image = await Image.create
    }
    catch(err){
      console.log('Error occoured', err)
      res.status(500).send({message: 'Error happened', Error: err.message});
    };
  },

    if (Array.isArray(prices) || prices.length === 0) {
      return res.status(400).send({Message: 'Price details is missing or empty'})
    }
    const product = await Product.create(newProduct);
    const createdPrices = [];
      for (const priceData of prices) {
        const{price, discount, sale_price} = priceData;

      }
      
      
      
      // i = 0; i < prices.length; i++) {
      //   let pricelogs = [];
      //   const price = prices[i].price;
      //   const discount = prices[i].discount;
      //   const sale_price = prices[i].sale_price;

        if (price !== null || discount !== null || sale_price !== null ) {
          const product_id = newProduct.id;

          req.body.prices[i].price_id = price_id;
          req.body.prices[i].product_id = product_id;

          const priceRecord = {
            id: price_id,
            price: price,
            discount: discount,
            sale_price: sale_price
          };
          pricelogs.push(priceRecord)
        }
        else{
          return res.send({Message: `Product details not created because other details are not included`})
        }
      }
      const createdProduct = await Product.findOne({id});
      productName = createdProduct.name;
      const createPrice = await Price.bulkCreate(req.body.devices).then(() => {
        return res.status(201).send({Message: `Product records for ${productName}`, Results: {createdProduct, createPrice}})
      })
    }
      


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