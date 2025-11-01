const form = document.getElementById("passwordForm");
const passwordList = document.getElementById("passwordList");

// Pega o userId do HTML (ex: <body data-user-id="1">)
const userId = document.body.getAttribute("data-user-id");

// =============== SALVAR NOVA SENHA ==================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const app = document.getElementById("app").value;
  const ussername = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const comment = document.getElementById("comment")?.value || "";

  const dados = {
    appName: app,
    username: username,
    password: password,
    comment: comment
  };

  const res = await fetch(`http://localhost:8080/passwords/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  if (res.ok) {
    alert("Senha salva com sucesso ✅");
    form.reset();
    carregarSenhas();
  } else {
    alert("Erro ao salvar ❌");
  }
});

// =============== CARREGAR SENHAS DO USUÁRIO ==================
async function carregarSenhas() {
  const res = await fetch(`http://localhost:8080/passwords/${userId}`);
  
  if (!res.ok) {
    passwordList.innerHTML = "<p>Erro ao carregar senhas ❌</p>";
    return;
  }

  const lista = await res.json();
  passwordList.innerHTML = ""; // Limpa anterior

  lista.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("senha-item");
    div.innerHTML = `
      <strong>${item.appName}</strong><br>
      Usuário: ${item.username}<br>
      Senha: ${item.password}<br>
      ${item.comment ? `<em>Comentário: ${item.comment}</em>` : ""}
    `;
    passwordList.appendChild(div);
  });
}

// Carrega ao abrir
carregarSenhas();

// =============== CAMPO DE COMENTÁRIO DINÂMICO ==================
const appSelect = document.getElementById("app");
const commentField = document.getElementById("comment");
const commentLabel = document.getElementById("commentLabel");

appSelect.addEventListener("change", () => {
  const value = appSelect.value;

  if (["banco", "streaming", "gmail", "wifi", "outros", "wallet"].includes(value)) {
    commentLabel.style.display = "block";
    commentField.style.display = "block";

    switch (value) {
      case "banco":
        commentField.placeholder = "Ex: Banco do Brasil, Caixa, Itaú...";
        break;
      case "streaming":
        commentField.placeholder = "Ex: Netflix, Disney+, Max...";
        break;
      case "gmail":
        commentField.placeholder = "Ex: Conta pessoal, Conta trabalho...";
        break;
      case "wifi":
        commentField.placeholder = "Ex: Wi-Fi Casa, Wi-Fi Empresa...";
        break;
      case "wallet":
        commentField.placeholder = "Ex: MetaMask, BlueWallet...";
        break;
      case "outros":
        commentField.placeholder = "Descreva o serviço...";
        break;
    }
  } else {
    commentField.style.display = "none";
    commentLabel.style.display = "none";
    commentField.value = "";
  }
});
