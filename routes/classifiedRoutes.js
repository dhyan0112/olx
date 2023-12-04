const express = require('express');
const classifiedController = require('../controllers/classifiedController');

const router = express.Router();

router.post('/', classifiedController.create);
router.get('/', classifiedController.getAll);
router.get('/:id', classifiedController.getById);
router.put('/:id', classifiedController.update);
router.delete('/:id', classifiedController.delete);

module.exports = router;