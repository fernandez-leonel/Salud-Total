const form = document.getElementById('loginForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = form.username.value.trim();
  const password = form.password.value.trim();

  if (!username || !password) {
    message.textContent = 'Por favor completa todos los campos.';
    return;
  }

  try {
    const res = await fetch('http://localhost:5155/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: username, clave: password })
    });

    if (!res.ok) {
      message.style.color = 'red';
      message.textContent = 'Credenciales incorrectas.';
      return;
    }

    const data = await res.json();

    localStorage.setItem('username', data.usuario);
    localStorage.setItem('rol', data.rol);

    if (data.rol === 'Profesional' && data.idProfesional) {
      localStorage.setItem('idProfesional', data.idProfesional);
    }

    message.style.color = 'green';
    message.textContent = `Bienvenido, ${data.rol}`;

    setTimeout(() => {
      window.location.href = 'main.html';
    }, 1000);

  } catch (error) {
    console.error('Error en login:', error);
    message.style.color = 'red';
    message.textContent = 'Error de red o del servidor.';
  }
});

