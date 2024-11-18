document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username === 'admin' && password === 'password') {
      alert('Login successful!');
    } else {
      document.getElementById('error-message').style.display = 'block';
    }
  });
  