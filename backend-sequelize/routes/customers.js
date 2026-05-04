const express = require('express');
const customersController = require('../controllers/customersController');

const router = express.Router();

router.get('/', customersController.getAll);
router.post('/', customersController.create);
router.put('/:id', customersController.update);
router.delete('/:id', customersController.remove);

module.exports = router;
