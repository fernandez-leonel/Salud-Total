document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('message');

  try {
    const response = await fetch('http://localhost:5155/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Guardar en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', data.role);
      localStorage.setItem('username', data.username);

      // Redirigir al panel principal real (main.html)
      window.location.href = "main.html";
    } else {
      message.style.color = 'red';
      message.textContent = data.message || 'Credenciales incorrectas.';
    }
  } catch (error) {
    console.error(error);
    message.style.color = 'red';
    message.textContent = 'Error de conexión con la API.';
  }
});

