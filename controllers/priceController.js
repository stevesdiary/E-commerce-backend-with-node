const { Price } = require('../models');

const priceController = {
  // createPrice: async (req, res) => {
  //   let newPrice = req.body;
  //   const {price, discount, sale_price} = req.body;
  //   const id = 
  //   try{
      
  //   }
  //   catch(err){
  //     console.log('An error occoured!', err);
  //     return res.send({message: 'Error showed up', Error: err.message})
  //   };
  // },



  findAllPrices: async (req, res) => {
    try{
      const prices = await Price.findAndCountAll({
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
        }
      });
      // console.log('Records found', prices)
      return res.status(200).send({message: 'Records found', prices})
    }catch(err){
      console.log('An error occoured!', err);
      return res.send({message: 'Error showed up', Error: err.message})
    };
  },

  // findOne: async (req, res) => {
  //   try{
  //     const id = req.params.id;
  //     const price = await Price.findOne({
  //       where: {id}, 
  //       attributes: {
  //         exclude: ['createdAt', 'updatedAt', 'deletedAt']
  //       }
  //     });
  //     console.log('price found', price);
  //     return res.status(200).send({message: 'Price found', price });
  //   }catch(err){
  //     console.log('Error occoured', err)
  //     res.status(500).send({message: 'Error happened', Error: err.message});
  //   };
  // },

  deletePrice: async (req, res ) => {
    try{
      const id = req.params.id;
      // console.log("IDDDD", id)
      const price = await Price.destroy({where: {id}})
      // console.log(user)
      if (price == 1 ){
        return res.send({message: `User with id ${id} has been deleted successfully!`})
      }
      if(user == 0){
        return res.send({message: `User ${id} does not exist or is deleted in the database`})
      }
    }catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err.message})
    }
  },

  updatePrice: async (req, res) => {
  try{
    const id = req.params.id;
    const {name, address, email, phone_number, type } = req.body;
    const updatePrice = await User.update({name, address, email, phone_number, type }, {where: {id}});
    console.log(updatePrice);
    if(updatePrice == 1) {
      return res.status(200).send({ message: 'Record Updated' });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({message: 'Error occoured', Error: err.message})
  }
  }
}

module.exports = priceController;