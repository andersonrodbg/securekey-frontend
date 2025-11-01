const form = document.getElementById("passwordForm");
const list = document.getElementById("passwordList");

let passwords = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const app = document.getElementById("app").value;
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const entry = { app, user, pass };
  passwords.push(entry);

  renderList();
  form.reset();
});

function renderList() {
  list.innerHTML = "";

  passwords.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "password-card";

    card.innerHTML = `
      <h3>${item.app.toUpperCase()}</h3>
      <p class="password-info"><b>Usuário:</b> ${item.user}</p>
      <p class="password-info"><b>Senha:</b> <span id="pass-${index}">•••••••</span></p>

      <div class="password-actions">
        <button class="show-btn" onclick="togglePass(${index})">Mostrar</button>
        <button class="delete-btn" onclick="deletePass(${index})">Excluir</button>
      </div>
    `;

    list.appendChild(card);
  });
}

function togglePass(i) {
  const span = document.getElementById(`pass-${i}`);
  if (span.innerText === "•••••••") {
    span.innerText = passwords[i].pass;
  } else {
    span.innerText = "•••••••";
  }
}

function deletePass(i) {
  passwords.splice(i, 1);
  renderList();
}

const appSelect = document.getElementById("app");
const commentField = document.getElementById("comment");
const commentLabel = document.getElementById("commentLabel");

appSelect.addEventListener("change", () => {
  const value = appSelect.value;

  if (value === "banco") {
    commentLabel.style.display = "block";
    commentField.style.display = "block";
    commentField.placeholder = "Ex: Banco do Brasil, Caixa, Itaú...";
  }

  else if (value === "streaming") {
    commentLabel.style.display = "block";
    commentField.style.display = "block";
    commentField.placeholder = "Ex: Netflix, Disney+, Max...";
  }

  else if (value === "gmail") {
    commentLabel.style.display = "block";
    commentField.style.display = "block";
    commentField.placeholder = "Ex: Conta pessoal, Conta trabalho...";
  }

  else if (value === "wifi") {
    commentLabel.style.display = "block";
    commentField.style.display = "block";
    commentField.placeholder = "Ex: Wi-Fi Casa, Wi-Fi Empresa...";
  }

  else if (value === "outros") {
    commentLabel.style.display = "block";
    commentField.style.display = "block";
    commentField.placeholder = "Descreva o serviço...";
  }

  else if (value === "wallet") {
    commentLabel.style.display = "block";
    commentField.style.display = "block";
    commentField.placeholder = "Ex: MetaMask, BlueWallet...";
  }

  else {
    commentField.style.display = "none";
    commentLabel.style.display = "none";
    commentField.value = "";
  }
});
