const InventoryService = require('../services/inventory');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

// TODO: Populate the right response, not only showing the ID's
const Inventory = {
  read: asyncUtil(async (req, res, next) => {
    const inventory = await InventoryService.read({ product: req.params.id });
    if (!inventory) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Inventory not found'
      });
    }
    res.status(200).json({ success: true, inventory });
  }),
  readAll: asyncUtil(async (req, res, next) => {
    const inventory = await InventoryService.readAll({ page: 1 });
    res.status(200).json({ success: true, inventory });
  })
};

module.exports = Inventory;
