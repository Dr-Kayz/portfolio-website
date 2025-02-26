const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Resume = sequelize.define('Resume', {
  resume_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Resume;
