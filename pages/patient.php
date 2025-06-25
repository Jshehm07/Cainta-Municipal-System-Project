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

$required = ["patientName", "age", "weight", "height", "dob"];
foreach ($required as $field) {
    if (empty($data[$field])) {
        echo json_encode(["success" => false, "message" => "Missing required field: $field"]);
        exit;
    }
}

$name = $conn->real_escape_string($data["patientName"]);
$age = (int)$data["age"];
$weight = (int)$data["weight"];
$height = (int)$data["height"];
$birth = $conn->real_escape_string($data["dob"]);

$allergies = "";
if (isset($data["allergies"])) {
    $allergies = is_array($data["allergies"])
        ? implode(", ", $data["allergies"])
        : $data["allergies"];
    $allergies = $conn->real_escape_string($allergies);
}

$illnesses = "";
if (isset($data["illnesses"])) {
    $illnesses = is_array($data["illnesses"])
        ? implode(", ", $data["illnesses"])
        : $data["illnesses"];
    $illnesses = $conn->real_escape_string($illnesses);
}

$sql = "INSERT INTO patient (
    patient_name, patient_age, patient_weight, patient_height,
    patient_birth, patient_allergies, patient_ill
) VALUES (
    '$name', $age, $weight, $height, '$birth', '$allergies', '$illnesses'
)";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "patient_id" => $conn->insert_id]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}

$conn->close();
?>
