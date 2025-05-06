const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const loader = document.getElementById('loader');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert('Erro ao acessar a câmera: ' + err.message);
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
    .then(res => {
      if (!res.ok) {
        throw new Error("Erro na requisição: " + res.status);
      }
      return res.json();
    })
    .then(data => {
      loader.style.display = 'none';

      if (data.sucesso) {
        alert("✅ Login facial bem-sucedido!");
      } else {
        alert("⚠️ Rosto não reconhecido.");
      }
    })
    .catch(err => {
      loader.style.display = 'none';
      console.error("Erro:", err);
      alert("Erro ao autenticar: " + err.message);
    });
}
