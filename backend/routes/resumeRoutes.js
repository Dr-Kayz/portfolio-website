const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const upload = require('../upload');

// For resume upload, expect a single file with the field name "resume_file"
router.post('/', upload.single('resume_file'), resumeController.updateResume);
router.get('/', resumeController.getResume);

module.exports = router;
