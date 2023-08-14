const express = require('express');
const router = express.Router();
const rows = require('../controllers/rows');
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(catchAsync(rows.index))
    .post(catchAsync(rows.createRow))

router.get('/new', rows.renderNewForm)

router.route('/:id')
    .get(catchAsync(rows.showRow))
    .patch(catchAsync(rows.updateRow))
    .delete(catchAsync(rows.deleteRow))

router.get('/:id/edit', catchAsync(rows.renderEditForm));

module.exports = router;