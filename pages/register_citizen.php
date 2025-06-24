<?php
header("Content-Type: application/json");
include("../db_connect.php"); 

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"] ?? '';
$email = $data["email"] ?? '';
$password = $data["password"] ?? '';

if (!$name || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

$stmt = $conn->prepare("SELECT CITIZEN_ID FROM citizen WHERE CITIZEN_EMAIL = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already registered."]);
    $stmt->close();
    exit;
}
$stmt->close();

$stmt = $conn->prepare("INSERT INTO citizen (CITIZEN_NAME, CITIZEN_EMAIL, CITIZEN_PSWD) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $password); 

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Citizen registered successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed."]);
}

$stmt->close();
$conn->close();
?>
