<?php
header("Content-Type: application/json");
include("../db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? '';
$type = $data['type'] ?? '';
$newPassword = $data['newPassword'] ?? '';

if (!$id || !$type || !$newPassword) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

if ($type === "staff") {
    $query = "UPDATE staff SET STAFF_PSWD = ? WHERE STAFF_ID = ?";
} else if ($type === "citizen") {
    $query = "UPDATE citizen SET CITIZEN_PSWD = ? WHERE CITIZEN_ID = ?";
} else {
    echo json_encode(["success" => false, "message" => "Invalid user type"]);
    exit;
}

$stmt = $conn->prepare($query);
$stmt->bind_param("si", $newPassword, $id);
$success = $stmt->execute();

echo json_encode([
    "success" => $success,
    "message" => $success ? "Password updated successfully." : "Update failed."
]);
?>
