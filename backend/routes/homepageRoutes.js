const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepageController');

router.get('/', homepageController.getHomepageProjects);
router.post('/', homepageController.updateHomepageProjects);

module.exports = router;
