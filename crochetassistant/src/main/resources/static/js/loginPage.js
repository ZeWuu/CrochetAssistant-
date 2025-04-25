
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('section');
    signupForm.style.opacity = 0;  
    signupForm.style.transition = 'opacity 1s ease-in-out'; 
  
  
    setTimeout(() => {
  
      signupForm.style.opacity = 1; 
    }, 500); 
  });