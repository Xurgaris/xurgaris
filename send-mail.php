<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    if ( empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL) ) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Preencha todos os campos corretamente."]);
        exit;
    }

    $to = "xurgaris@gmail.com"; // Coloque aqui o seu e-mail
    $subject = "Nova mensagem do site Xurgaris";
    $body = "Nome: $name\nE-mail: $email\nMensagem:\n$message";
    $headers = "From: $name <$email>";

    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Mensagem enviada com sucesso!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Ocorreu um erro ao enviar a mensagem."]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Método inválido."]);
}
?>
