<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "root", "healthycainta");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "No data received"]);
    exit;
}

$name = $conn->real_escape_string($data["APT_NAME"]);
$appointee = $conn->real_escape_string($data["APT_APPOINTEE"]);
$phone = intval($data["APT_PHONE"]);
$id = $conn->real_escape_string($data["APT_IDENTIFICATION"]);
$specifics = $conn->real_escape_string($data["APT_SPECIFICS"]);
$date = $conn->real_escape_string($data["APT_DATE"]);
$time = $conn->real_escape_string($data["APT_TIME"]);

$sql = "INSERT INTO appointment (
    APT_NAME, APT_APPOINTEE, APT_PHONE, APT_IDENTIFICATION, APT_SPECIFICS, APT_DATE, APT_TIME
) VALUES (
    '$name', '$appointee', $phone, '$id', '$specifics', '$date', '$time'
)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "ticket" => $conn->insert_id]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
