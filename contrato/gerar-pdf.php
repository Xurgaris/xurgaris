$tokensValidos = require 'tokens.php';
$token = $_POST['token'] ?? '';

if (!in_array($token, $tokensValidos)) {
  exit("Token inválido");
}


<?php
require 'fpdf/fpdf.php';

// Dados recebidos
$nome = $_POST['nome'] ?? '';
$cpf = $_POST['cpf'] ?? '';
$email = $_POST['email'] ?? '';
$assinatura = $_POST['assinatura'] ?? '';

if (!$nome || !$cpf || !$assinatura) {
  exit("Dados incompletos");
}

// Prova jurídica
$ip = $_SERVER['REMOTE_ADDR'];
$data = date("d/m/Y H:i:s");

// Assinatura
$assinatura = str_replace('data:image/png;base64,', '', $assinatura);
$assinatura = base64_decode($assinatura);

$id = uniqid();
$assinaturaPath = "assinaturas/$id.png";
file_put_contents($assinaturaPath, $assinatura);

// Organizar contratos
$ano = date("Y");
$mes = date("m");
@mkdir("contratos/$ano/$mes", 0777, true);

$pdfPath = "contratos/$ano/$mes/contrato-$id.pdf";

// Geração do PDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','',12);

$pdf->MultiCell(0,8,
"CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Contratante: $nome
CPF: $cpf

Data da assinatura: $data
IP do assinante: $ip

Este contrato foi aceito digitalmente, com validade jurídica,
conforme MP 2.200-2/2001."
);

$pdf->Ln(10);
$pdf->Image($assinaturaPath, 10, null, 60);
$pdf->Output('F', $pdfPath);

// ENVIO DE E-MAIL (simples)
if ($email) {
  $assunto = "Contrato assinado - Xurgaris";
  $mensagem = "Olá $nome,

Seu contrato foi assinado com sucesso em $data.

Xurgaris";
  $headers = "From: contato@xurgaris.com.br";

  mail($email, $assunto, $mensagem, $headers);
}

$dadosPath = __DIR__ . "/../dados/contratos.json";

$registro = [
  "id" => $id,
  "nome" => $nome,
  "cpf" => $cpf,
  "email" => $email,
  "data" => $data,
  "ip" => $ip,
  "arquivo" => $pdfPath
];

$lista = [];

if (file_exists($dadosPath)) {
  $lista = json_decode(file_get_contents($dadosPath), true) ?? [];
}

$lista[] = $registro;

file_put_contents($dadosPath, json_encode($lista, JSON_PRETTY_PRINT));


echo "OK";

$ano = date("Y");
$mes = date("m");

@mkdir("contratos/$ano/$mes", 0777, true);
$pdf->Output('F', "contratos/$ano/$mes/contrato-$id.pdf");
