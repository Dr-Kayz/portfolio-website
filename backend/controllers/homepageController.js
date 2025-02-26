const HomepageProject = require('../models/HomepageProject');
const Project = require('../models/Project');

// Get homepage projects (including associated Project data)
exports.getHomepageProjects = async (req, res) => {
  try {
    const homepageProjects = await HomepageProject.findAll({
      include: [Project],
      order: [['display_order', 'ASC']]
    });
    res.json(homepageProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update homepage projects
exports.updateHomepageProjects = async (req, res) => {
  try {
    // Expect req.body.homepageProjects to be an array of objects:
    // e.g., [{ project_id: 1, display_order: 1 }, { project_id: 2, display_order: 2 }]
    await HomepageProject.destroy({ where: {} });
    const homepageProjects = await HomepageProject.bulkCreate(req.body.homepageProjects);
    res.json(homepageProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
