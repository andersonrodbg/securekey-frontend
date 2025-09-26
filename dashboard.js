document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("passwordForm");
  const passwordList = document.getElementById("passwordList");
  const logoutBtn = document.getElementById("logoutBtn");

  // Senhas salvas em memória (futuro -> salvar no backend)
  let senhas = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const app = document.getElementById("app").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const novaSenha = { app, username, password };
    senhas.push(novaSenha);

    atualizarLista();
    form.reset();
  });

  function atualizarLista() {
    passwordList.innerHTML = "";
    senhas.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("password-item");
      div.innerHTML = `
        <strong>${item.app.toUpperCase()}</strong><br>
        Usuário: ${item.username} <br>
        Senha: ${item.password} <br>
        <button onclick="removerSenha(${index})">Excluir</button>
      `;
      passwordList.appendChild(div);
    });
  }

  window.removerSenha = (index) => {
    senhas.splice(index, 1);
    atualizarLista();
  };

  logoutBtn.addEventListener("click", () => {
    window.location.href = "index.html"; // volta para login
  });
});
