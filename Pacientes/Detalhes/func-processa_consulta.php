<?php
include("../../funcoes.php");

if (isset($_POST['id'])) {
    $id_consulta = $_POST['id'];
    $conn = conexao();

    // Verificar conexão
    if (!$conn) {
        die("Conexão falhou: " . mysqli_connect_error());
    }

    // Consulta SQL
    $sql = "SELECT * FROM consultas WHERE id_consulta = $id_consulta";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row); // Retornar os dados no formato JSON
    } else {
        echo json_encode(['error' => 'Nenhuma consulta encontrada.']);
    }

    // Fechar conexão
    mysqli_close($conn);
} else {
    echo json_encode(['error' => 'ID não recebido.']);
}
