<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "root", "healthycainta");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit;
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid ID"]);
    exit;
}

$sql = "SELECT 
    PATIENT_ID as id,
    patient_name as name,
    patient_age as age,
    patient_weight as weight,
    patient_height as height,
    patient_birth as birth,
    patient_allergies as allergies,
    patient_ill as illness
FROM patient
WHERE PATIENT_ID = $id";

$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode(["success" => true, "patient" => $row]);
} else {
    echo json_encode(["success" => false, "message" => "Patient not found"]);
}

$conn->close();
?>
