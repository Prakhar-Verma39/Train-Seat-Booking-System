const express = require('express');
const router = express.Router();
const coaches = require('../controllers/coaches');


router.route('/')
    .get(coaches.index)
    .post(coaches.createCoach)

router.get('/new', coaches.renderNewForm)

router.route('/:id')
    .get(coaches.showCoach)
    .patch(coaches.updateCoach)
    .delete(coaches.deleteCoach)

router.get('/:id/edit', coaches.renderEditForm);

module.exports = router;