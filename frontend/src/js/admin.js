// frontend/src/js/admin.js
import '../css/styles.css';

const apiBaseUrl = 'http://localhost:3000/api';
const adminContainer = document.getElementById('admin-container');

// Check for a saved token in localStorage
let token = localStorage.getItem('adminToken');

// Render the login form inside a Materialize card
function renderLoginForm() {
  adminContainer.innerHTML = `
    <div class="row">
      <div class="col s12 m8 l6 offset-m2 offset-l3">
        <div class="card grey darken-4">
          <div class="card-content white-text">
            <span class="card-title center-align">Admin Login</span>
            <form id="login-form">
              <div class="input-field">
                <input id="username" type="text" required>
                <label for="username">Username</label>
              </div>
              <div class="input-field">
                <input id="password" type="password" required>
                <label for="password">Password</label>
              </div>
              <div class="center-align">
                <button class="btn waves-effect waves-light" type="submit">Login</button>
              </div>
            </form>
            <div id="login-error" style="color:red; margin-top:10px;"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${apiBaseUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        token = data.token;
        localStorage.setItem('adminToken', token);
        renderAdminPanel();
      } else {
        document.getElementById('login-error').textContent = data.error || 'Login failed.';
      }
    } catch (err) {
      console.error(err);
      document.getElementById('login-error').textContent = 'An error occurred.';
    }
  });
}

// Render the admin panel with all sections including Manage Projects
function renderAdminPanel() {
  adminContainer.innerHTML = `
    <h3 class="center-align">Admin Panel</h3>
    <div class="row">
      <!-- Add New Project Card -->
      <div class="col s12">
        <div class="card grey darken-4">
          <div class="card-content white-text">
            <span class="card-title">Add New Project</span>
            <form id="add-project-form" enctype="multipart/form-data">
              <div class="input-field">
                <input type="text" id="project-title" required>
                <label for="project-title">Title</label>
              </div>
              <div class="input-field">
                <textarea id="summary" class="materialize-textarea" required></textarea>
                <label for="summary">Summary</label>
              </div>
              <div class="input-field">
                <textarea id="details" class="materialize-textarea" required></textarea>
                <label for="details">Details</label>
              </div>
              <div class="file-field input-field">
                <div class="btn">
                  <span>Main Image</span>
                  <input type="file" id="main-image" required>
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
              <div class="file-field input-field">
                <div class="btn">
                  <span>Sketch Image</span>
                  <input type="file" id="sketch-image" required>
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
              <div class="file-field input-field">
                <div class="btn">
                  <span>Hover Image</span>
                  <input type="file" id="hover-image" required>
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
              <div class="file-field input-field">
                <div class="btn">
                  <span>Additional Images</span>
                  <input type="file" id="additional-images" multiple>
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
              <div class="center-align">
                <button class="btn waves-effect waves-light" type="submit">Add Project</button>
              </div>
            </form>
            <div id="add-project-response" class="center-align" style="margin-top: 10px;"></div>
          </div>
        </div>
      </div>

      <!-- Manage Homepage Projects Card -->
      <div class="col s12">
        <div class="card grey darken-4">
          <div class="card-content white-text">
            <span class="card-title">Manage Homepage Projects</span>
            <p>Select up to 10 projects to display on the homepage:</p>
            <form id="homepage-projects-form">
              <div class="input-field">
                <select id="homepage-projects-select" multiple size="10"></select>
                <label>Homepage Projects</label>
              </div>
              <div class="center-align">
                <button class="btn waves-effect waves-light" type="submit">Update Homepage Selection</button>
              </div>
            </form>
            <div id="homepage-response" class="center-align" style="margin-top: 10px;"></div>
          </div>
        </div>
      </div>

      <!-- Update Resume Card -->
      <div class="col s12">
        <div class="card grey darken-4">
          <div class="card-content white-text">
            <span class="card-title">Update Resume</span>
            <form id="update-resume-form" enctype="multipart/form-data">
              <div class="file-field input-field">
                <div class="btn">
                  <span>Resume File</span>
                  <input type="file" id="resume-file" required>
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
              <div class="center-align">
                <button class="btn waves-effect waves-light" type="submit">Update Resume</button>
              </div>
            </form>
            <div id="resume-response" class="center-align" style="margin-top: 10px;"></div>
          </div>
        </div>
      </div>

      <!-- New: Manage Projects Card for Edit/Delete -->
      <div class="col s12">
        <div class="card grey darken-4">
          <div class="card-content white-text">
            <span class="card-title">Manage Projects</span>
            <div id="manage-projects-container">
              <!-- List of projects with Edit/Delete buttons will be injected here -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="center-align admin-logout" style="margin-top: 20px; margin-bottom: 80px;">
      <button id="logout-btn" class="btn red">Logout</button>
    </div>

    <!-- Edit Project Modal -->
    <div id="edit-project-modal" class="modal">
      <div class="modal-content white-text">
        <h4>Edit Project</h4>
        <form id="edit-project-form" enctype="multipart/form-data">
          <div class="input-field">
            <input type="text" id="edit-project-title" required>
            <label for="edit-project-title">Title</label>
          </div>
          <div class="input-field">
            <textarea id="edit-summary" class="materialize-textarea" required></textarea>
            <label for="edit-summary">Summary</label>
          </div>
          <div class="input-field">
            <textarea id="edit-details" class="materialize-textarea" required></textarea>
            <label for="edit-details">Details</label>
          </div>
          <!-- Optionally, include file inputs for updating images -->
          <div class="file-field input-field">
            <div class="btn">
              <span>Main Image</span>
              <input type="file" id="edit-main-image">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
          </div>
          <div class="file-field input-field">
            <div class="btn">
              <span>Sketch Image</span>
              <input type="file" id="edit-sketch-image">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
          </div>
          <div class="file-field input-field">
            <div class="btn">
              <span>Hover Image</span>
              <input type="file" id="edit-hover-image">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
          </div>
          <div class="center-align">
            <button class="btn waves-effect waves-light" type="submit">Update Project</button>
          </div>
        </form>
        <div id="edit-project-response" class="center-align" style="margin-top:10px;"></div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close btn-flat">Close</a>
      </div>
    </div>
  `;

  // Initialize Materialize components
  M.FormSelect.init(document.querySelectorAll('select'));
  M.Modal.init(document.querySelectorAll('.modal'));

  // Populate the homepage projects select list
  fetchProjectsForAdmin();

  // Render Manage Projects List
  renderManageProjects();

  // --- Add Project Form Submission ---
  document.getElementById('add-project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', document.getElementById('project-title').value);
    formData.append('summary', document.getElementById('summary').value);
    formData.append('details', document.getElementById('details').value);

    const mainImageFile = document.getElementById('main-image').files[0];
    if (mainImageFile) formData.append('main_image', mainImageFile);

    const sketchImageFile = document.getElementById('sketch-image').files[0];
    if (sketchImageFile) formData.append('sketch_image', sketchImageFile);

    const hoverImageFile = document.getElementById('hover-image').files[0];
    if (hoverImageFile) formData.append('hover_image', hoverImageFile);

    const additionalImagesFiles = document.getElementById('additional-images').files;
    if (additionalImagesFiles && additionalImagesFiles.length > 0) {
      for (let i = 0; i < additionalImagesFiles.length; i++) {
        formData.append('additional_images', additionalImagesFiles[i]);
      }
    }

    try {
      const res = await fetch(`${apiBaseUrl}/projects`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      document.getElementById('add-project-response').textContent = data.error ? data.error : 'Project added successfully!';
      document.getElementById('add-project-form').reset();
      fetchProjectsForAdmin(); // Refresh the select list
      renderManageProjects(); // Refresh the Manage Projects list
    } catch (err) {
      console.error(err);
      document.getElementById('add-project-response').textContent = 'Error adding project.';
    }
  });

  // --- Manage Homepage Projects Submission ---
  document.getElementById('homepage-projects-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const select = document.getElementById('homepage-projects-select');
    const selectedOptions = Array.from(select.selectedOptions).map(opt => {
      return { project_id: opt.value, display_order: parseInt(opt.getAttribute('data-order')) || 0 };
    });
    if (selectedOptions.length > 10) {
      document.getElementById('homepage-response').textContent = 'Select no more than 10 projects.';
      return;
    }
    try {
      const res = await fetch(`${apiBaseUrl}/homepageProjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ homepageProjects: selectedOptions }),
      });
      const data = await res.json();
      document.getElementById('homepage-response').textContent = data.error ? data.error : 'Homepage projects updated!';
      document.getElementById('homepage-projects-form').reset();
    } catch (err) {
      console.error(err);
      document.getElementById('homepage-response').textContent = 'Error updating homepage projects.';
    }
  });

  // --- Update Resume Form Submission ---
  document.getElementById('update-resume-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const resumeFile = document.getElementById('resume-file').files[0];
    if (!resumeFile) {
      document.getElementById('resume-response').textContent = 'Please select a resume file.';
      return;
    }
    formData.append('resume_file', resumeFile);

    try {
      const res = await fetch(`${apiBaseUrl}/resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      document.getElementById('resume-response').textContent = data.error ? data.error : 'Resume updated!';
    } catch (err) {
      console.error(err);
      document.getElementById('resume-response').textContent = 'Error updating resume.';
    }
  });

  // Logout handler
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    token = null;
    renderLoginForm();
  });
}

// Function to fetch projects for the homepage select list in the admin panel
function fetchProjectsForAdmin() {
  fetch(`${apiBaseUrl}/projects`)
    .then(res => res.json())
    .then(projects => {
      const select = document.getElementById('homepage-projects-select');
      select.innerHTML = '';
      projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.title;
        option.setAttribute('data-order', '0'); // Default order
        select.appendChild(option);
      });
      // Reinitialize the Materialize select component after updating options
      M.FormSelect.init(select);
    })
    .catch(err => console.error(err));
}

// Render Manage Projects List with Edit and Delete buttons
function renderManageProjects() {
  fetch(`${apiBaseUrl}/projects`)
    .then(res => res.json())
    .then(projects => {
      const container = document.getElementById('manage-projects-container');
      container.innerHTML = '';
      if (projects.length === 0) {
        container.innerHTML = '<p>No projects available.</p>';
        return;
      }
      projects.forEach(project => {
        const projectRow = document.createElement('div');
        projectRow.className = 'row';
        projectRow.style.marginBottom = '10px';
        projectRow.innerHTML = `
          <div class="col s8">
            <strong>${project.title}</strong>
          </div>
          <div class="col s4 right-align">
            <button class="btn-small waves-effect waves-light edit-btn" data-id="${project.id}">Edit</button>
            <button class="btn-small red waves-effect waves-light delete-btn" data-id="${project.id}" style="margin-left:5px;">Delete</button>
          </div>
        `;
        container.appendChild(projectRow);
      });

      // Attach event listeners for Edit buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const projectId = btn.getAttribute('data-id');
          openEditProjectModal(projectId);
        });
      });

      // Attach event listeners for Delete buttons
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const projectId = btn.getAttribute('data-id');
          if (confirm('Are you sure you want to delete this project?')) {
            deleteProject(projectId);
          }
        });
      });
    })
    .catch(err => console.error(err));
}

// Open Edit Project Modal with project data pre-filled
function openEditProjectModal(projectId) {
  fetch(`${apiBaseUrl}/projects/${projectId}`)
    .then(res => res.json())
    .then(project => {
      if (project.error) {
        alert('Error fetching project details.');
        return;
      }
      // Populate modal fields with project data
      document.getElementById('edit-project-title').value = project.title;
      M.updateTextFields(); // Update labels
      document.getElementById('edit-summary').value = project.summary;
      M.updateTextFields();
      document.getElementById('edit-details').value = project.details;
      M.updateTextFields();

      // Open the modal
      const modalElem = document.getElementById('edit-project-modal');
      const instance = M.Modal.getInstance(modalElem);
      instance.open();

      // Attach form submission handler for editing
      document.getElementById('edit-project-form').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', document.getElementById('edit-project-title').value);
        formData.append('summary', document.getElementById('edit-summary').value);
        formData.append('details', document.getElementById('edit-details').value);
        // Attach new file uploads if provided
        const newMain = document.getElementById('edit-main-image').files[0];
        if (newMain) formData.append('main_image', newMain);
        const newSketch = document.getElementById('edit-sketch-image').files[0];
        if (newSketch) formData.append('sketch_image', newSketch);
        const newHover = document.getElementById('edit-hover-image').files[0];
        if (newHover) formData.append('hover_image', newHover);

        try {
          const res = await fetch(`${apiBaseUrl}/projects/${projectId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });
          const data = await res.json();
          document.getElementById('edit-project-response').textContent = data.error ? data.error : 'Project updated successfully!';
          renderManageProjects();
          instance.close();
        } catch (err) {
          console.error(err);
          document.getElementById('edit-project-response').textContent = 'Error updating project.';
        }
      };
    })
    .catch(err => console.error(err));
}

// Delete a project
function deleteProject(projectId) {
  fetch(`${apiBaseUrl}/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      alert(data.error ? data.error : 'Project deleted successfully!');
      renderManageProjects();
      fetchProjectsForAdmin();
    })
    .catch(err => {
      console.error(err);
      alert('Error deleting project.');
    });
}

// On page load, check if token exists; render login or admin panel accordingly.
document.addEventListener('DOMContentLoaded', () => {
  if (token) {
    renderAdminPanel();
  } else {
    renderLoginForm();
  }
});
