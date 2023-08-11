const express = require('express');
const router = express.Router();
const rows = require('../controllers/rows');


router.route('/')
    .get(rows.index)
    .post(rows.createRow)

router.get('/new', rows.renderNewForm)

router.route('/:id')
    .get(rows.showRow)
    .patch(rows.updateRow)
    .delete(rows.deleteRow)

router.get('/:id/edit', rows.renderEditForm);

module.exports = router;