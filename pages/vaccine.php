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

$fname = $conn->real_escape_string($data["VACCINE_F_NAME"]);
$lname = $conn->real_escape_string($data["VACCINE_L_NAME"]);
$age = (int)$data["VACCINE_AGE"];
$vaccineName = $conn->real_escape_string($data["VACCINE_V_NAME"]);

$f_dose = !empty($data["VACCINE_F_DOSE"]) ? "'" . $conn->real_escape_string($data["VACCINE_F_DOSE"]) . "'" : "NULL";
$s_dose = !empty($data["VACCINE_S_DOSE"]) ? "'" . $conn->real_escape_string($data["VACCINE_S_DOSE"]) . "'" : "NULL";

$sql = "INSERT INTO vaccine (VACCINE_F_NAME, VACCINE_L_NAME, VACCINE_AGE, VACCINE_V_NAME, VACCINE_F_DOSE, VACCINE_S_DOSE)
        VALUES ('$fname', '$lname', $age, '$vaccineName', $f_dose, $s_dose)";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}

$conn->close();
?>
