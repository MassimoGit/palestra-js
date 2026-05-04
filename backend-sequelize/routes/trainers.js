const express = require('express');
const trainersController = require('../controllers/trainersController');

const router = express.Router();

router.get('/', trainersController.getAll);
router.post('/', trainersController.create);
router.put('/:id', trainersController.update);
router.delete('/:id', trainersController.remove);

module.exports = router;
