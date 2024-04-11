const { v4: uuidv4 } = require('uuid');
const { WishList, Product, User, Variations } = require('../models');


const wishListController = {
  createWishList: async (req, res) => {
    const wish_id = uuidv4();
    try{
      const { product_id, user_id } = req.query;
      const wishList = await WishList.create( { wish_id, user_id, product_id } );
      return res.status(201).send({ Message: 'Item has been added to your wishlist!', Result: wishList });
    }
    catch(err){
      console.log('An error occoured!', err);
      return res.send({message: 'Error showed up', Error: err.message})
    };
  },

  findAllWishes: async (req, res) => {
    try{
      const wishes = await WishList.findAndCountAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        },
        include: [
          {
            model: User,
            as: 'User',
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
            }
          },
          {
            model: Product,
            as: 'Product',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
          }
        ]
      });
      return res.status(200).send({message: 'Records found', Result: wishes})
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
        },
        include: [
          {
            model: User,
            as: 'User',
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
            }
          },
          {
            model: Product,
            as: 'Product',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
          }
        ]
      });
      return res.status(200).send({message: 'Price found', wishList });
    }catch(err){
      console.log('Error occoured', err)
      res.status(500).send({message: 'Error happened', Error: err.message});
    };
  },

  deleteWish: async (req, res ) => {
    try{
      const wish_id = req.params.wish_id;
      const wish = await WishList.destroy({where: {wish_id}})
      const message = wish === 1
      ? `Wish with id ${wish_id} has been deleted successfully!`
      : `Wish with id ${wish_id} does not exist or is deleted in the database`;
      return res.status(200).send({ message });
    }
    catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err.message})
    }
  }
}

module.exports = wishListController;