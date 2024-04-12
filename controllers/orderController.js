const { Order, Product, User } = require('../models');
const moment = require('moment');
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const order_id = uuidv4();
      console.log('order', order_id);
      const date = dayjs().format('YYYY-MM-DD');
      const time = dayjs().format('HH:mm A')
      const order_number = Math.floor(1000 + Math.random() * 9000);
      const { product_id, user_id, quantity, status } = req.query;
      const order = await Order.create({ order_id, product_id, user_id, date, time, quantity, order_number, status });
      return res.status(201).send({ Message: `Order created with order number ${order_number}`, Result: order });
    }
    catch(err){
      console.log('An error occoured!', err);
      res.status(500).send({message: 'Error showed up', err})
    };
  },

  findAllOrders: async (req, res) => {
    try{
      const orders = await Order.findAndCountAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt']
        },
        include: [
          {
            model: User,
            as: 'User',
            attributes: {
              exclude: [ 'password', 'createdAt', 'updatedAt', 'deletedAt' ]
            },
          },
          {
            model: Product,
            as: 'Product',
            attributes: {
              exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ]
            },
          },
        ]
      });
      return res.status(200).send({ Message: 'Records found', Result: orders })
    }catch(err){
      console.log('An error occoured!', err);
      return res.status(500).send({message: 'Error happened', Error: err.message});
    };
  },

  findOne: async (req, res) => {
    try{
      const id = req.params.id;
      const order = await Order.findOne({
        where: {id}, 
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
      });
      // console.log('Order found', order);
      return res.status(200).send({ Message: 'Order found', order });
    }catch(err){
      console.log('Error occoured', err)
      res.status(500).send({ Message: 'Error happened', err});
    };
  },

  deleteOrder: async (req, res ) => {
    try{
      const order_id = req.params.order_id;
      console.log("IDDDD", id)
      const order = await Order.destroy({where: {id}})
      const message = order === 1
      ? `Order with id ${order_id} has been deleted successfully!`
      : `Order ${id} does not exist or is deleted in the database`
        return res.status(200).send({ message })
    }catch(err){
      return res.status(500).send({message: 'Error occoured', err})
    }
  },

  updateOrder: async (req, res) => {
  try{
    const id = req.params.id;
    const {name, email, order_number } = req.query;
    const updateOrder = await Order.update({ name, address, email, phone_number, type }, {where: {id}});
    console.log(updateProduct);
    if(updateOrder == 1) {
      return res.status(200).send({ Message: 'Record Updated', Result: updateOrder });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ Message: 'Error occoured', Error: err.message });
  }
  }
}

module.exports = orderController;