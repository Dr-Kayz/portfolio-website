import '../css/styles.css';

const apiBaseUrl = '/api';

function loadProjectsList(projects) {
  const container = document.getElementById('projects-container');
  container.innerHTML = ''; // Clear any existing content

  projects.forEach(project => {
    // Create a column for Materialize's grid system
    const col = document.createElement('div');
    col.className = 'col s12 m6 l4';

    // Card element
    col.innerHTML = `
      <div class="card">
        <div class="card-image">
          <img src="${project.sketch_image}" alt="${project.title}">
          <span class="card-title">${project.title}</span>
        </div>
        <div class="card-content">
          <p class="black-text">${project.summary}</p>
        </div>
        <div class="card-action">
          <a href="project.html?id=${project.id}" class="black-text">View Details</a>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

function fetchProjects() {
  fetch(`${apiBaseUrl}/projects`)
    .then(response => response.json())
    .then(data => {
      loadProjectsList(data);
    })
    .catch(err => {
      console.error(err);
      const container = document.getElementById('projects-container');
      container.innerHTML = '<p>Error loading projects.</p>';
    });
}

document.addEventListener('DOMContentLoaded', fetchProjects);
