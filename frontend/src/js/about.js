import '../css/styles.css';

const apiBaseUrl = 'http://localhost:3000/api';

function fetchResume() {
  fetch(`${apiBaseUrl}/resume`)
    .then(res => res.json())
    .then(data => {
      if (data.resume_url) {
        const resumeLink = document.getElementById('resume-link');
        resumeLink.href = data.resume_url;
      } else {
        document.getElementById('resume-section').innerHTML = '<p>Resume not available.</p>';
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('resume-section').innerHTML = '<p>Error loading resume.</p>';
    });
}

document.addEventListener('DOMContentLoaded', fetchResume);
