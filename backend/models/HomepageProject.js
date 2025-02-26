const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Project = require('./Project');

const HomepageProject = sequelize.define('HomepageProject', {
  display_order: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: false,
});

// Define association: each HomepageProject references one Project
HomepageProject.belongsTo(Project, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Project.hasMany(HomepageProject, { foreignKey: 'project_id' });

module.exports = HomepageProject;
