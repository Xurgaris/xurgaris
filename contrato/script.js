const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let desenhando = false;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

canvas.addEventListener("mousedown", () => (desenhando = true));
canvas.addEventListener("mouseup", () => (desenhando = false));
canvas.addEventListener("mousemove", desenhar);

function desenhar(e) {
  if (!desenhando) return;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function limpar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function enviar() {
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const aceite = document.getElementById("aceite").checked;
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  form.append("token", token);

  if (!nome || !cpf || !aceite) {
    alert("Preencha todos os campos.");
    return;
  }

  const assinatura = canvas.toDataURL();
  const form = new FormData();

  form.append("nome", nome);
  form.append("cpf", cpf);
  form.append("assinatura", assinatura);

  fetch("gerar-pdf.php", { method: "POST", body: form })
    .then((r) => r.text())
    .then((resp) => {
      if (resp === "OK") {
        window.location.href = "sucesso.html";
      } else {
        alert("Erro ao gerar contrato.");
      }
    });
}
const email = document.getElementById("email").value.trim();
form.append("email", email);
