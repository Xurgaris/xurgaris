<?php
session_start();
if (!isset($_SESSION['admin'])) {
  header("Location: login.php");
  exit;
}

$dadosPath = __DIR__ . "/../dados/contratos.json";
$contratos = [];

if (file_exists($dadosPath)) {
  $contratos = json_decode(file_get_contents($dadosPath), true) ?? [];
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Painel ADM | Xurgaris</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<h1>Painel Administrativo</h1>
<a href="logout.php">Sair</a>

<table>
  <tr>
    <th>Cliente</th>
    <th>CPF</th>
    <th>E-mail</th>
    <th>Data</th>
    <th>IP</th>
    <th>Contrato</th>
  </tr>

  <?php foreach ($contratos as $c): ?>
  <tr>
    <td><?= htmlspecialchars($c['nome']) ?></td>
    <td><?= htmlspecialchars($c['cpf']) ?></td>
    <td><?= htmlspecialchars($c['email']) ?></td>
    <td><?= $c['data'] ?></td>
    <td><?= $c['ip'] ?></td>
    <td>
      <a href="../<?= $c['arquivo'] ?>" target="_blank">PDF</a>
    </td>
  </tr>
  <?php endforeach; ?>

</table>

</body>
</html>
