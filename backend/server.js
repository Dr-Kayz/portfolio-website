const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config');
const sequelize = require('./db');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));


// Import routes
const projectRoutes = require('./routes/projectRoutes');
const homepageRoutes = require('./routes/homepageRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Mount routes
app.use('/api/projects', projectRoutes);
app.use('/api/homepageProjects', homepageRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Import models to ensure they are registered
require('./models/Project');
require('./models/HomepageProject');
require('./models/Resume');
require('./models/ContactMessage');

// Sync models with the database.
sequelize.sync({ alter: true })
    .then(() => {
        const config = require('./config/config');
        app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

