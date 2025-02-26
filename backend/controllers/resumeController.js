const Resume = require('../models/Resume');

// Get resume
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (resume) {
      res.json(resume);
    } else {
      res.status(404).json({ error: 'Resume not set' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update resume (or create if not exists)
exports.updateResume = async (req, res) => {
  try {
    let resume = await Resume.findOne();
    // Use the file path from req.file
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;
    if (!resumeUrl) {
      return res.status(400).json({ error: 'No resume file uploaded.' });
    }
    if (resume) {
      await resume.update({ resume_url: resumeUrl });
    } else {
      resume = await Resume.create({ resume_url: resumeUrl });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};