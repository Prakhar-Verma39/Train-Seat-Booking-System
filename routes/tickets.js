const express = require('express');
const router = express.Router();
const tickets = require('../controllers/tickets');


router.route('/')
    .get(tickets.index)
    .post(tickets.createTicket)

router.get('/new', tickets.renderNewForm)

router.route('/:id')
    .get(tickets.showTicket)
    .patch(tickets.updateTicket)
    .delete(tickets.deleteTicket)

router.get('/:id/edit', tickets.renderEditForm);

module.exports = router;