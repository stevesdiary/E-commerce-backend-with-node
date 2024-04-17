const { Variation } = require('../models');

const variationController = {
  findAllVariations: async (req, res) => {
    try{
      const variations = await Variation.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
      });
      return res.status(200).send({ Message: 'Records found', Result: variations })
    }catch(err){
      console.log('An error occoured!', err);
      return res.send({ message: 'Error showed up', Error: err.message })
    };
  },

  findBySize: async (req, res) => {
    try{
      const size = req.query.size;
      const variation = await Variation.findAll({
        where: {size}, 
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
      });
      console.log('Variation found', variation);
      return res.status(200).send({message: 'Variation found', variation });
    }catch(err){
      console.log('Error occoured', err)
      res.status(500).send({ message: 'Error happened', Error: err.message});
    };
  },

  deleteVariation: async (req, res ) => {
    try{
      const variation_id = req.params.variation_id;
      const variation = await Variation.destroy({where: {variation_id}});
      const message = variation === 1
      ? `Wish with id: ${variation_id} has been deleted successfully!`
      : `User ${variation_id} does not exist or is deleted in the database`;
      return res.send({ message });
    }catch(err){
      return res.status(500).send({ message: 'Error occoured', Error: err.message })
    }
  },

  updateVariation: async (req, res) => {
    try{
      const variation_id = req.params.variation_id;
      const {colour, size, style} = req.query;
      const updateVariation = await User.update({colour, size, style }, {where: {variation_id}});
      return res.status(200).send({ message: 'Record Updated', Result: updateVariation });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({message: 'Error occoured', Error: err.message})
    }
  }
}

module.exports = variationController;