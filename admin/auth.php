<?php
session_start();

$usuario = "admin";
$senha = "xurgaris123"; // depois trocamos por hash

if ($_POST['user'] === $usuario && $_POST['pass'] === $senha) {
  $_SESSION['admin'] = true;
  header("Location: painel.php");
  exit;
}

header("Location: login.php");
