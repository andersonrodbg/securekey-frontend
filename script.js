const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const loader = document.getElementById('loader');
const faceSection = document.getElementById('faceSection');
const tokenSection = document.getElementById('tokenSection');

document.getElementById('faceBtn').addEventListener('click', () => {
  tokenSection.classList.add('hidden');
  faceSection.classList.remove('hidden');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)
    .catch(err => alert('Erro ao acessar a câmera: ' + err.message));
});

document.getElementById('tokenBtn').addEventListener('click', () => {
  faceSection.classList.add('hidden');
  tokenSection.classList.remove('hidden');
});

function capturarImagem() {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imagemBase64 = canvas.toDataURL('image/jpeg');
  loader.style.display = 'block';

  fetch('http://localhost:8080/autenticar-facial', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imagem: imagemBase64 })
  })
  .then(res => res.json())
  .then(data => {
    loader.style.display = 'none';
    if (data.sucesso) {
      alert("✅ Login facial bem-sucedido!");
      window.location.href = "dashboard.html";
    } else {
      alert("⚠️ Rosto não reconhecido.");
    }
  })
  .catch(err => {
    loader.style.display = 'none';
    alert("Erro ao autenticar: " + err.message);
  });
}

function loginComToken() {
  const email = document.getElementById('email').value;
  const token = document.getElementById('token').value;

  if (!email || !token) {
    alert('Preencha todos os campos!');
    return;
  }

  fetch('http://localhost:8080/login-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token })
  })
  .then(res => res.json())
  .then(data => {
    if (data.sucesso) {
      alert("✅ Login por token bem-sucedido!");
      window.location.href = "dashboard.html";
    } else {
      alert("❌ Token inválido ou expirado.");
    }
  })
  .catch(err => {
    alert("Erro: " + err.message);
  });
}
