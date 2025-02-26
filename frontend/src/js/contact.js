import '../css/styles.css';

const apiBaseUrl = 'http://localhost:3000/api';

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  fetch(`${apiBaseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('contact-response').textContent = 'Message sent successfully!';
      document.getElementById('contact-form').reset();
    })
    .catch(err => {
      console.error(err);
      document.getElementById('contact-response').textContent = 'Error sending message.';
    });
});
