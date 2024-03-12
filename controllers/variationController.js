const { Variation } = require('../models');

const variationController = {
  findAllVariations: async (req, res) => {
    try{
      const variations = await Variation.findAndCountAll({
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
        }
      });
      // console.log('Records found', variations)
      return res.status(200).send({message: 'Records found', variations})
    }catch(err){
      console.log('An error occoured!', err);
      return res.send({message: 'Error showed up', Error: err.message})
    };
  },

  findOne: async (req, res) => {
    try{
      const id = req.params.id;
      const variation = await Variation.findOne({
        where: {id}, 
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
      });
      console.log('Variation found', variation);
      return res.status(200).send({message: 'Variation found', variation });
    }catch(err){
      console.log('Error occoured', err)
      res.status(500).send({message: 'Error happened', Error: err.message});
    };
  },

  deleteVariation: async (req, res ) => {
    try{
      const id = req.params.id;
      console.log("IDDDD", id)
      const variation = await Variation.destroy({where: {id}})
      // console.log(user)
      if (variation == 1 ){
        return res.send({message: `User with id ${id} has been deleted successfully!`})
      }
      if(user == 0){
        return res.send({message: `User ${id} does not exist or is deleted in the database`})
      }
    }catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err.message})
    }
  },

  updateVariation: async (req, res) => {
  try{
    const id = req.params.id;
    const {colour, size, pattern} = req.body;
    const updateVariation = await User.update({name, address, email, phone_number, type }, {where: {id}});
    // console.log(updateVariation);
    return res.status(200).send({ message: 'Record Updated' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({message: 'Error occoured', Error: err.message})
  }
  }
}

module.exports = variationController;