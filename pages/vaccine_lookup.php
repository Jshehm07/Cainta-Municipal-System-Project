<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "root", "healthycainta");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

$fname = $conn->real_escape_string($_GET["fname"]);
$lname = $conn->real_escape_string($_GET["lname"]);

$sql = "SELECT * FROM vaccine WHERE VACCINE_F_NAME = '$fname' AND VACCINE_L_NAME = '$lname' LIMIT 1";
$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode(["success" => true, "record" => $row]);
} else {
    echo json_encode(["success" => false, "message" => "Record not found"]);
}

$conn->close();
?>