const ProductModel = require('../models/product');

const ProductService = {
  create: ({ price, category, name, properties }) => {
    const product = new ProductModel({
      price,
      category,
      name,
      properties
    });

    return product.save();
  },
  read: data => ProductModel.findOne(data),
  readAll: data => ProductModel.paginate({}, data),
  update: (id, payload) => {
    return ProductModel.findByIdAndUpdate(id, payload, { new: true });
  },
  delete: id => ProductModel.findByIdAndDelete(id)
};

module.exports = ProductService;
