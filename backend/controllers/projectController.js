const Project = require('../models/Project');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, summary, details } = req.body;
    // Extract files from req.files (if provided)
    const mainImageFile = req.files.main_image ? req.files.main_image[0] : null;
    const sketchImageFile = req.files.sketch_image ? req.files.sketch_image[0] : null;
    const hoverImageFile = req.files.hover_image ? req.files.hover_image[0] : null;
    const additionalImagesFiles = req.files.additional_images || [];

    // Build file paths, accessible at '/uploads/filename'
    const main_image = mainImageFile ? `/uploads/${mainImageFile.filename}` : '';
    const sketch_image = sketchImageFile ? `/uploads/${sketchImageFile.filename}` : '';
    const hover_image = hoverImageFile ? `/uploads/${hoverImageFile.filename}` : '';
    const additional_images = additionalImagesFiles.map(file => `/uploads/${file.filename}`);

    const newProject = await Project.create({
      title,
      main_image,
      summary,
      details,
      additional_images,
      sketch_image,
      hover_image,
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update an existing project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Extract text fields from the request body
    const { title, summary, details } = req.body;

    // Extract uploaded files (if any) from req.files
    const mainImageFile = req.files.main_image ? req.files.main_image[0] : null;
    const sketchImageFile = req.files.sketch_image ? req.files.sketch_image[0] : null;
    const hoverImageFile = req.files.hover_image ? req.files.hover_image[0] : null;
    const additionalImagesFiles = req.files.additional_images || [];

    // Build updated file paths (if new files are uploaded)
    const updatedMainImage = mainImageFile ? `/uploads/${mainImageFile.filename}` : project.main_image;
    const updatedSketchImage = sketchImageFile ? `/uploads/${sketchImageFile.filename}` : project.sketch_image;
    const updatedHoverImage = hoverImageFile ? `/uploads/${hoverImageFile.filename}` : project.hover_image;
    const updatedAdditionalImages = additionalImagesFiles.length > 0
      ? additionalImagesFiles.map(file => `/uploads/${file.filename}`)
      : project.additional_images;

    // Update the project with new or existing values
    await project.update({
      title: title || project.title,
      summary: summary || project.summary,
      details: details || project.details,
      main_image: updatedMainImage,
      sketch_image: updatedSketchImage,
      hover_image: updatedHoverImage,
      additional_images: updatedAdditionalImages,
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.destroy();
      res.json({ message: 'Project deleted' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
