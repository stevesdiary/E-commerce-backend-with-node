const { v4: uuidv4 } = require('uuid');
const { WishList, Product, User, Variations } = require('/models');
const { WishList, Product, User, Variations } = require('../models');


const wishListController = {
  createWishList: async (req, res) => {
    
    const wish_id = uuidv4();
    console.log(wish_id, "WISH ID", req.body)

    try{
      const { product_id, user_id } = req.query;
      let newWishList = { wish_id, user_id, product_id };
      const wishList = await WishList.create({ newWishList });
      return res.status(201).send({ Message: 'Item has been added to your wishlist!', Result: wishList });
    }
    catch(err){
      console.log('An error occoured!', err);
      return res.send({message: 'Error showed up', Error: err.message})
    };
  },

  findAllWishes: async (req, res) => {
    try{
      const id = req.query.id;
      const wishes = await WishList.findAndCountAll({
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
        },
        where: id,
        include: [
          {
            model: Product,
            as: 'product',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
          }
        ]
      });
      return res.status(200).send({message: 'Records found', prices})
    }catch(err){
      console.log('An error occoured!', err);
      return res.send({message: 'Error showed up', Error: err.message})
    };
  },

  findOne: async (req, res) => {
    try{
      const wish_id = req.params.id;
      const wishList = await WishList.findOne({
        where: {id: wish_id}, 
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
      });
      console.log('Wish found', wishList);
      return res.status(200).send({message: 'Price found', wishList });
    }catch(err){
      console.log('Error occoured', err)
      res.status(500).send({message: 'Error happened', Error: err.message});
    };
  },

  deleteWish: async (req, res ) => {
    try{
      const wish_id = req.params.id;
      const wish = await WishList.destroy({where: {id}})
    
      if (wish == 1 ){
        return res.send({message: `Wish with id ${wish_id} has been deleted successfully!`})
      }
      if(wish == 0){
        return res.send({message: `User ${wish_id} does not exist or is deleted in the database`})
      }
    }
    catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err.message})
    }
  },

  updateWishList: async (req, res) => {
  try{
    const {product_id, user_id, wish_id} = req.params;
    const updateWishList = await WishList.update({user_id, product_id}, {where: {wish_id}});
  
    return res.status(200).send({ message: 'Record Updated', Result: updateWishList });
    
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({message: 'Error occoured', Error: err.message})
  }
  }
}

module.exports = wishListController;