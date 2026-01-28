<?php
session_start();
if (isset($_SESSION['admin'])) {
  header("Location: painel.php");
  exit;
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login ADM | Xurgaris</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<form method="post" action="auth.php" class="login">
  <h2>Painel Administrativo</h2>
  <input type="text" name="user" placeholder="Usuário" required>
  <input type="password" name="pass" placeholder="Senha" required>
  <button>Entrar</button>
</form>

</body>
</html>
