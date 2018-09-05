const CartService = require('../services/cart');
const InventoryService = require('../services/inventory');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

const Cart = {
  getTotal: cart => {
    return cart.products
      .map(product => product.quantity * product.product.price)
      .reduce((prev, curr) => prev + curr, 0);
  },
  create: asyncUtil(async (req, res, next) => {
    const cart = await CartService.create({ user: req.user.id });
    if (!cart) {
      throw errorBuilder({
        name: 'ValidationError',
        message: 'Cart already existent'
      });
    }

    res.status(201).json({ success: true, cart });
  }),
  read: asyncUtil(async (req, res, next) => {
    const cart = await CartService.read({ user: req.user.id });
    if (!cart) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Cart not found'
      });
    }
    res.status(200).json({ success: true, cart });
  }),
  update: asyncUtil(async (req, res, next) => {
    const item = req.body;

    const inventory = await InventoryService.read({ product: item.id });
    if (!inventory) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Inventory not found'
      });
    }

    const quantityByUserId = inventory.reservations
      .map(r => (r._id == req.user.id ? r.quantity : 0))
      .reduce((prev, curr) => prev + curr, 0);

    const oldQuantity = inventory.quantity + quantityByUserId;
    const totalQuantity = item.quantity - oldQuantity;

    const payload = {
      quantity: item.quantity,
      id: item.id,
      delta: totalQuantity
    };

    const inventoryUpdated = await InventoryService.update(
      req.user.id,
      payload
    );
    if (!inventoryUpdated) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Not enough product'
      });
    }

    let cart;
    if (item.quantity <= 0) {
      await InventoryService.deleteProduct(req.user.id, item);
      cart = await CartService.removeProduct(req.user.id, item);
    } else {
      cart = await CartService.update(req.user.id, item);
    }
    if (!cart) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Product not available'
      });
    }

    res.status(200).json({ success: true, cart });
  }),
  delete: asyncUtil(async (req, res, next) => {
    const cart = await CartService.delete({ user: req.user.id });
    if (!cart) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Cart not found'
      });
    }
    res.status(204).json();
  })
};

module.exports = Cart;
