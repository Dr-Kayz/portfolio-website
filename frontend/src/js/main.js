import '../css/styles.css';

// Base URL 
const apiBaseUrl = 'http://localhost:3000/api';
const SKETCH_MAX_WIDTH = 350; // Maximum sketch width

function renderSketches(projects) {
  // Limit to a maximum of 9 projects
  const projectsToShow = projects.slice(0, 9);
  const container = document.querySelector('.sketch-container');
  container.innerHTML = ''; // Clear existing content

  // Get container width
  const containerWidth = container.offsetWidth; // 100vw
  const cellWidth = containerWidth / 3;  // Each cell is 1/3 of container's width

  // Create 9 grid cells
  const totalCells = 9;
  const gridCells = [];
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    container.appendChild(cell);
    gridCells.push(cell);
  }

  // Shuffle the gridCells array to randomize project placement
  gridCells.sort(() => Math.random() - 0.5);

  // For each project, create its sketch and center it in the cell
  projectsToShow.forEach((project, index) => {
    const cell = gridCells[index];
    const sketch = document.createElement('div');
    sketch.classList.add('sketch');

    // Determine sketch width based on the cell (but do not exceed SKETCH_MAX_WIDTH)
    const sketchWidth = Math.min(cellWidth * 0.9, SKETCH_MAX_WIDTH);

    // Center the sketch within the cell
    // Calculate the left and top offset for absolute centering
    const leftOffset = (cellWidth - sketchWidth) / 2;
    const topOffset = (cellWidth - sketchWidth) / 2; // cell is square because of aspect-ratio
    sketch.style.width = `${sketchWidth}px`;
    sketch.style.height = `${sketchWidth}px`;
    sketch.style.left = `${leftOffset}px`;
    sketch.style.top = `${topOffset}px`;

    // Create default image element
    const defaultImg = document.createElement('img');
    defaultImg.src = project.sketch_image;
    defaultImg.alt = project.title;
    defaultImg.classList.add('default-image');

    // Create hover image element
    const hoverImg = document.createElement('img');
    hoverImg.src = project.hover_image;
    hoverImg.alt = project.title;
    hoverImg.classList.add('hover-image');

    // Hover events
    sketch.addEventListener('mouseover', () => {
      sketch.style.zIndex = '10';
    });
    sketch.addEventListener('mouseout', () => {
      sketch.style.zIndex = '1';
    });

    // Navigate to project detail page on click
    sketch.addEventListener('click', () => {
      window.location.href = `project.html?id=${project.id}`;
    });

    // Append images and add sketch to cell
    sketch.appendChild(defaultImg);
    sketch.appendChild(hoverImg);
    cell.appendChild(sketch);
  });
}

// Fetch homepage projects from the API
fetch(`${apiBaseUrl}/homepageProjects`)
  .then(response => response.json())
  .then(data => {
    // Assuming API returns an array of objects with a 'Project' property
    const projects = data.map(item => item.Project);
    renderSketches(projects);
  })
  .catch(err => console.error(err));
