const express = require('express');
const router = express.Router();
const coaches = require('../controllers/coaches');
const catchAsync = require('../utils/catchAsync');


router.route('/')
    .get(catchAsync(coaches.index))
    .post(catchAsync(coaches.createCoach))

router.get('/new', coaches.renderNewForm)

router.route('/:id')
    .get(catchAsync(coaches.showCoach))
    .patch(catchAsync(coaches.updateCoach))
    .delete(catchAsync(coaches.deleteCoach))

router.get('/:id/edit', catchAsync(coaches.renderEditForm));

module.exports = router;