<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$conn = new mysqli("localhost", "root", "root", "healthycainta");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit;
}

$id = $conn->real_escape_string($data["id"]);
$name = $conn->real_escape_string($data["name"]);
$email = $conn->real_escape_string($data["email"]);
$password = $conn->real_escape_string($data["password"]);

$sql = "UPDATE citizen SET CITIZEN_NAME='$name', CITIZEN_EMAIL='$email', CITIZEN_PSWD='$password' WHERE CITIZEN_ID=$id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}

$conn->close();
?>
