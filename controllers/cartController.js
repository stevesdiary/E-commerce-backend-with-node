const { v4: uuidv4 } = require('uuid');
const { Cart, Product, User, Variations } = require('../models');
const cart = require('../models/cart');

const cartController = {
  createCart: async (req, res) => {
    try{
      const cartOptions = req.body.cartOptions;
      const { product_id, user_id } = req.query;
      const cart_id = uuidv4();
      // const existingCart = await Cart.findOne({ where: { cart_id, product_id, user_id}});
      // let message; deal with this when trying to update the cart
      if (Array.isArray(cartOptions)) {
        let variationsArray = []
        for (let i = 0; i < cartOptions.length; i++) {
          const variation = cartOptions[i];

          const size = variation.size;
          const quantity = variation.quantity;
          const style = variation.style;
          const colour = variation.colour;

          const newRecord = {
            cart_id,
            product_id,
            user_id,
            size,
            colour,
            style,
            quantity
          };
          variationsArray.push(newRecord);
          const cart = await Cart.bulkCreate([newRecord]);
        }
        
        return res.status(200).send({ message: `Cart created successfully!`, Result: cart });
      }
      // if (existingCart) {
      //   await Cart.update({ colour, quantity, style }, { where: { cartOptions } });
      //   message = 'Cart updated successfully';
      // } else {
      //   await Cart.create({ cart_id, product_id, user_id, cartOptions });
      //   message = 'Cart created successfully';
      // }
      
    }
    catch(err){
      console.log('An error occoured!', err);
      return res.status(500).send({message: 'Error showed up', Error: err.message})
    };
  },
  updateCart: async( req, res) => {
    try{

    }
    catch(err){
      console.log('An error occoured!', err);
      return res.send({message: 'Error showed up', Error: err.message})
    };
  },

  findAllCarts: async (req,res) => {
    try{
      const allCarts = await Cart.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ],
      }
    })
    return res.status(200).send({ Messsage: "Records found", Result: allCarts });
    }
    catch(err){
      console.log('Error occoured', err)
      res.status(500).send({ Message: 'Error happened', err});
    };
  },

  deleteCart: async (req, res ) => {
    try{
      const cart_id = req.params.cart_id;
      const cart = await Cart.destroy({where: {cart_id}});
      const message = cart === 1
      ? `Cart with id ${cart_id} has been deleted successfully!`
      : `Cart with id ${cart_id} does not exist or is deleted in the database`;
      return res.status(200).send({ message });
    }catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err.message})
    }
  },
}

module.exports = cartController;
