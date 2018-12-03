const CartModel = require('../models/cart');
const InventoryModel = require('../models/inventory');

const CartService = {
  create: ({ user }) => {
    const cart = new CartModel({
      user,
      products: []
    });

    return cart.save();
  },
  read: data => CartModel.findOne(data).populate('products.product'),
  delete: data => CartModel.findOneAndRemove(data),
  removeProduct: (userId, payload) => {
    return CartModel.findOneAndUpdate(
      { user: userId },
      {
        $pull: { products: { product: payload.id } }
      }
    );
  },
  update: (id, payload) => {
    return CartModel.findOneAndUpdate(
      {
        user: id
      },
      {
        $set: {
          products: {
            product: payload.id,
            quantity: payload.quantity
          }
        }
      },
      { new: true }
    ).populate('products.product');
  },
  watcherExpiration: async date => {
    const carts = CartModel.find({ updatedAt: { $lte: date } }).cursor();

    while (carts.next) {
      const cart = await carts.next();
      if (cart === null) {
        return;
      }
      cart.products.forEach(async data => {
        await InventoryModel.findOneAndUpdate(
          { product: data.product },
          {
            $inc: { quantity: data.quantity },
            $pull: { reservations: { _id: cart.user } }
          }
        );

        return await CartModel.findOneAndUpdate(
          { user: cart.user },
          { $pull: { products: { product: data.product } } }
        );
      });
    }
  }
};

module.exports = CartService;
