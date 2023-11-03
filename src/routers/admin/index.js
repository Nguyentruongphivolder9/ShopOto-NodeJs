const express = require('express');
const router = express.Router();
const siteController = require('../../app/controllers/SiteController');
const product = require('./product');
const order = require('./order');

router.get('/', siteController.admin);;

module.exports = { product, order, router };