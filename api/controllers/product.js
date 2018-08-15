const ProductService = require('../services/product');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

const Product = {
  create: asyncUtil(async (req, res, next) => {
    const product = await ProductService.create(req.body);
    res.status(201).json({ success: true, product });
  }),
  read: asyncUtil(async (req, res, next) => {
    const product = await ProductService.read({ _id: req.params.id });
    if (!product) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Product not found'
      });
    }
    res.status(200).json({ success: true, product });
  }),
  update: asyncUtil(async (req, res, next) => {
    const payload = req.body;
    const product = await ProductService.update(req.params.id, payload);
    if (!product) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Product not found'
      });
    }
    res.status(200).json({ success: true, product });
  }),
  delete: asyncUtil(async (req, res, next) => {
    const product = await ProductService.delete(req.params.id);
    if (!product) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Product not found'
      });
    }
    res.status(204).json({ success: true });
  })
};

module.exports = Product;
