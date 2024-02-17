const { Order } = require('../models');

const orderController = {
  findAllOrders: async (req, res) => {
    try{
      const orders = await Order.findAndCountAll({
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
        }
      });
      // console.log('Records found', orders)
      return res.status(200).send({Message: 'Records found', Result: orders})
    }catch(err){
      console.log('An error occoured!', err);
      return res.send({message: 'Error showed up', err})
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
      console.log('Order found', order);
      return res.status(200).send({ Message: 'Order found', order });
    }catch(err){
      console.log('Error occoured', err)
      res.status(500).send({ Message: 'Error happened', err});
    };
  },

  deleteOrder: async (req, res ) => {
    try{
      const id = req.params.id;
      console.log("IDDDD", id)
      const order = await Order.destroy({where: {id}})
      // console.log(user)
      if (order == 1 ){
        return res.send({message: `Order with id ${id} has been deleted successfully!`})
      }
      if(order == 0){
        return res.send({message: `Order ${id} does not exist or is deleted in the database`})
      }
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
    return res.status(500).send({ Message: 'Error occoured', Error: err.message })
  }
  }
}

module.exports = orderController;