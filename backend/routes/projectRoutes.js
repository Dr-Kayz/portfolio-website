const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../upload');

// Accept multiple files: one each for main, sketch, and hover images, plus additional images
router.post(
    '/',
    upload.fields([
        { name: 'main_image', maxCount: 1 },
        { name: 'sketch_image', maxCount: 1 },
        { name: 'hover_image', maxCount: 1 },
        { name: 'additional_images', maxCount: 10 },
    ]),
    projectController.createProject
);

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
