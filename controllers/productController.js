const { Product } = require('../models');

const productController = {
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
      return res.send({message: 'Error showed up', err})
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
      res.status(500).send({message: 'Error happened', err});
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
      return res.status(500).send({message: 'Error occoured', err})
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