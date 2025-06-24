<?php
header("Content-Type: application/json");
include("../../db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = isset($data['id']) ? intval($data['id']) : 0;
$type = $data['type'] ?? '';
$field = $data['field'] ?? '';
$value = $data['value'] ?? '';

if (!$id || !$type || !$field || $value === null) {
    echo json_encode(["success" => false, "message" => "Missing or invalid input."]);
    exit;
}

$allowedFields = ['name', 'email', 'password', 'role'];
if (!in_array($field, $allowedFields)) {
    echo json_encode(["success" => false, "message" => "Invalid field."]);
    exit;
}

$fieldMap = [
    "staff" => [
        "name" => "STAFF_NAME",
        "email" => "STAFF_EMAIL",
        "password" => "STAFF_PSWD",
        "role" => "STAFF_ROLE",
        "idColumn" => "STAFF_ID",
        "table" => "staff"
    ],
    "citizen" => [
        "name" => "CITIZEN_NAME",
        "email" => "CITIZEN_EMAIL",
        "password" => "CITIZEN_PSWD",
        "idColumn" => "CITIZEN_ID",
        "table" => "citizen"
    ]
];

if (!isset($fieldMap[$type])) {
    echo json_encode(["success" => false, "message" => "Invalid user type."]);
    exit;
}

if ($field === "email" && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email format."]);
    exit;
}

$column = $fieldMap[$type][$field];
$idColumn = $fieldMap[$type]['idColumn'];
$table = $fieldMap[$type]['table'];

$query = "UPDATE `$table` SET `$column` = ? WHERE `$idColumn` = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare statement: " . $conn->error]);
    exit;
}

$stmt->bind_param("si", $value, $id);
$success = $stmt->execute();
$error = $stmt->error;

$stmt->close();
$conn->close();

echo json_encode([
    "success" => $success,
    "message" => $success ? "Updated successfully." : "Update failed: $error"
]);
?>
