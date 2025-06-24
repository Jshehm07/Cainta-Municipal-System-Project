<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "root", "healthycainta");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit;
}

$result = $conn->query("SELECT 
    PATIENT_ID as id,
    patient_name as name,
    patient_age as age,
    patient_weight as weight,
    patient_height as height,
    patient_birth as birth,
    patient_allergies as allergies,
    patient_ill as illness
FROM patient");

$patients = [];

while ($row = $result->fetch_assoc()) {
    $patients[] = $row;
}

echo json_encode(["success" => true, "data" => $patients]);
$conn->close();
?>
