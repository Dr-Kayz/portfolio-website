import '../css/styles.css';

const apiBaseUrl = 'http://localhost:3000/api';

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

function loadProjectDetails(project) {
  // Set the hero section background image and title overlay
  const heroSection = document.getElementById('hero-section');
  heroSection.style.backgroundImage = `url('${project.main_image}')`;
  heroSection.style.backgroundSize = 'cover';
  heroSection.style.backgroundPosition = 'center';

  const titleOverlay = document.getElementById('project-title-overlay');
  titleOverlay.textContent = project.title;

  // Populate the summary card
  const summaryEl = document.getElementById('project-summary');
  summaryEl.textContent = project.summary;

  // Prepare collapsible body for detailed description and additional images
  const detailsBody = document.getElementById('project-details-body');
  detailsBody.innerHTML = ''; // Clear any existing content

  // Detailed description
  const detailsPara = document.createElement('p');
  detailsPara.textContent = project.details;
  detailsBody.appendChild(detailsPara);

  // Additional images grid (if any)
  if (project.additional_images && project.additional_images.length > 0) {
    const imagesGrid = document.createElement('div');
    imagesGrid.className = 'row';
    
    project.additional_images.forEach(imgUrl => {
      const col = document.createElement('div');
      col.className = 'col s12 m6 l4';
      
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = project.title;
      img.className = 'responsive-img';
      col.appendChild(img);
      
      imagesGrid.appendChild(col);
    });
    
    detailsBody.appendChild(imagesGrid);
  }
}

function fetchProject() {
  const projectId = getQueryParam('id');
  if (!projectId) {
    document.getElementById('project-container').innerHTML = '<p>No project ID provided.</p>';
    return;
  }

  fetch(`${apiBaseUrl}/projects/${projectId}`)
    .then(res => res.json())
    .then(project => {
      if (project.error) {
        document.getElementById('project-container').innerHTML = `<p>${project.error}</p>`;
      } else {
        loadProjectDetails(project);
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('project-container').innerHTML = '<p>Error loading project details.</p>';
    });
}

document.addEventListener('DOMContentLoaded', fetchProject);
