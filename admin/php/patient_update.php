<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "root", "healthycainta");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$id = (int)$data["id"];
$name = $conn->real_escape_string($data["name"]);
$age = (int)$data["age"];
$weight = (int)$data["weight"];
$height = (int)$data["height"];
$birth = $conn->real_escape_string($data["birth"]); 
$allergies = $conn->real_escape_string($data["allergies"]);
$illness = $conn->real_escape_string($data["illness"]);

$sql = "UPDATE patient SET 
            patient_name = '$name',
            patient_age = $age,
            patient_weight = $weight,
            patient_height = $height,
            patient_birth = '$birth',
            patient_allergies = '$allergies',
            patient_ill = '$illness'
        WHERE PATIENT_ID = $id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}

$conn->close();
?>
