<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "root", "healthycainta");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed."]);
    exit;
}

$id = $_GET['id'] ?? null;
if (!$id) {
    echo json_encode(["success" => false, "message" => "Missing ID."]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM vaccine WHERE VACCINE_ID = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($record = $result->fetch_assoc()) {
    echo json_encode(["success" => true, "record" => $record]);
} else {
    echo json_encode(["success" => false, "message" => "Record not found."]);
}

$conn->close();
?>