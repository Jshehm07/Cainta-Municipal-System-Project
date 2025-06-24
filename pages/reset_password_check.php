<?php
header("Content-Type: application/json");
include("../db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';

if (!$email) {
    echo json_encode(["success" => false, "message" => "Email is required"]);
    exit;
}

$stmt = $conn->prepare("SELECT STAFF_ID, STAFF_NAME, STAFF_EMAIL FROM staff WHERE STAFF_EMAIL = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "success" => true,
        "type" => "staff",
        "id" => $row["STAFF_ID"],
        "name" => $row["STAFF_NAME"],
        "email" => $row["STAFF_EMAIL"]
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT CITIZEN_ID, CITIZEN_NAME, CITIZEN_EMAIL FROM citizen WHERE CITIZEN_EMAIL = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "success" => true,
        "type" => "citizen",
        "id" => $row["CITIZEN_ID"],
        "name" => $row["CITIZEN_NAME"],
        "email" => $row["CITIZEN_EMAIL"]
    ]);
    exit;
}

echo json_encode(["success" => false, "message" => "Account not found."]);
?>
