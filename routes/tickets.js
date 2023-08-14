const express = require('express');
const router = express.Router();
const tickets = require('../controllers/tickets');
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(catchAsync(tickets.index))
    .post(catchAsync(tickets.createTicket))

router.get('/new', tickets.renderNewForm)

router.route('/:id')
    .get(catchAsync(tickets.showTicket))
    .patch(catchAsync(tickets.updateTicket))
    .delete(catchAsync(tickets.deleteTicket))

router.get('/:id/edit', catchAsync(tickets.renderEditForm));

module.exports = router;