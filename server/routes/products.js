const sequenceGenerator = require('./sequenceGenerator');
const Product = require('../models/product');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
  Product.find()
    .populate('group')
    .then(products => {
      res.status(200).json({
          message: 'Products fetched successfully!',
          products: products
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  const maxProductId = sequenceGenerator.nextId("products");

  const product = new Product({
    id: maxProductId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });

  product.save()
    .then(createdProduct => {
      res.status(201).json({
        message: 'Product added successfully',
        product: createdProduct
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred.',
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {
  Product.findOne({ id: req.params.id })
    .then(product => {
      product.name = req.body.name;
      product.email = req.body.email;
      product.phone = req.body.phone;
      product.imageUrl = req.body.imageUrl;
      product.group = req.body.group;

      Product.updateOne({ id: req.params.id }, product)
        .then(result => {
          res.status(204).json({
            message: 'Product updated successfully'
          })
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred...',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Product not found.',
        error: { product: 'Product not found'}
      });
    });
});


router.delete("/:id", (req, res, next) => {
  Product.findOne({ id: req.params.id })
    .then(product => {
      Product.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Product deleted successfully"
          });
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred!',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Product not found.',
        error: { product: 'Product not found.'}
      });
    });
});
