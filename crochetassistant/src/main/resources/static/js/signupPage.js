
document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.querySelector('section');
  signupForm.style.opacity = 0;  
  signupForm.style.transition = 'opacity 1s ease-in-out'; 


  setTimeout(() => {

    signupForm.style.opacity = 1; 
  }, 500); 
});



const csrfToken = document.querySelector('input[name="_csrf"]').value;
const csrfHeaderName = document.querySelector('input[name="header_name"]').value;

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('passwordRepeat').value;
  const email = document.getElementById('email').value;

  if (username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || email.trim() === '') {
    alert('Please fill out all fields');
    return;
  }

  const data = {
    username,
    password,
    email
  };

  if (password == confirmPassword) {
    const jsonData = JSON.stringify(data);
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [csrfHeaderName]: csrfToken,
      },
      body: jsonData
    })
      .then(response => {
        console.log('Response:', response.status);
        if (response.ok) {
          alert('Signup successful! Please log in.');
          window.location.href = '/login';
        } else {
          alert('Signup failed. Please try again.');

        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  } else {
    alert('Passwords do not match. Please try again.');
  }
});

