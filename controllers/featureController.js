const { Feature } = require('../models');

const featureController = {
  createFeature: async (req, res) => {
    try{
      
    }
    catch(err){
      console.log('An error occoured!', err);
      return res.send({message: 'Error showed up', Error: err.message})
    };
  },



  findAllFeatures: async (req, res) => {
    try{
      const features = await Feature.findAndCountAll({
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
        }
      });
      // console.log('Records found', features)
      return res.status(200).send({message: 'Records found', features})
    }catch(err){
      console.log('An error occoured!', err);
      return res.send({message: 'Error showed up', Error: err.message})
    };
  },

  findOne: async (req, res) => {
    try{
      const id = req.params.id;
      const feature = await Feature.findOne({
        where: {id}, 
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
      });
      console.log('feature found', feature);
      return res.status(200).send({message: 'Feature found', feature });
    }catch(err){
      console.log('Error occoured', err)
      res.status(500).send({message: 'Error happened', Error: err.message});
    };
  },

  deleteFeature: async (req, res ) => {
    try{
      const id = req.params.id;
      console.log("IDDDD", id)
      const feature = await Feature.destroy({where: {id}})
      // console.log(user)
      if (feature == 1 ){
        return res.send({message: `User with id ${id} has been deleted successfully!`})
      }
      if(user == 0){
        return res.send({message: `User ${id} does not exist or is deleted in the database`})
      }
    }catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err.message})
    }
  },

  updateFeature: async (req, res) => {
  try{
    const id = req.params.id;
    const {name, address, email, phone_number, type } = req.body;
    const updateFeature = await User.update({name, address, email, phone_number, type }, {where: {id}});
    console.log(updateFeature);
    if(updateFeature == 1) {
      return res.status(200).send({ message: 'Record Updated' });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({message: 'Error occoured', Error: err.message})
  }
  }
}

module.exports = featureController;