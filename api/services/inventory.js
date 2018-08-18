const InventoryModel = require('../models/inventory');

const InventoryService = {
  create: ({ id, quantity }) => {
    const inventory = new InventoryModel({
      product: id,
      quantity
    });

    return inventory.save();
  },
  read: data => InventoryModel.findOne(data).populate('product'),
  readAll: data => {
    const payload = Object.assign({}, data, { populate: 'reservations.cart' });
    return InventoryModel.paginate({}, payload);
  },
  update: (userId, { id, quantity, delta }) => {
    return InventoryModel.findOneAndUpdate(
      {
        product: id,
        quantity: { $gte: delta }
      },
      {
        $set: {
          quantity: -delta,
          reservations: {
            quantity,
            _id: userId
          }
        }
      },
      {
        new: true
      }
    );
  },
  deleteProduct: async (userId, data) => {
    await InventoryModel.findOneAndUpdate(
      { 'products.product': data.product },
      {
        $pull: { reservations: { _id: userId } }
      }
    );
  }
};

module.exports = InventoryService;
