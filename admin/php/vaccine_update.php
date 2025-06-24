<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "root", "healthycainta");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['VACCINE_ID'])) {
    echo json_encode(["success" => false, "message" => "Invalid data."]);
    exit;
}

$stmt = $conn->prepare("UPDATE vaccine SET 
    VACCINE_F_NAME = ?, 
    VACCINE_L_NAME = ?, 
    VACCINE_AGE = ?, 
    VACCINE_V_NAME = ?, 
    VACCINE_F_DOSE = ?, 
    VACCINE_S_DOSE = ? 
    WHERE VACCINE_ID = ?");

$stmt->bind_param(
    "ssisssi",
    $data['VACCINE_F_NAME'],
    $data['VACCINE_L_NAME'],
    $data['VACCINE_AGE'],
    $data['VACCINE_V_NAME'],
    $data['VACCINE_F_DOSE'],
    $data['VACCINE_S_DOSE'],
    $data['VACCINE_ID']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed."]);
}

$conn->close();
