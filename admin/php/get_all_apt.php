<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "root";
$db = "healthycainta";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit();
}

$sql = "SELECT * FROM appointment";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $appointments = [];

    while ($row = $result->fetch_assoc()) {
        $appointments[] = $row;
    }

    echo json_encode(["success" => true, "records" => $appointments]);
} else {
    echo json_encode(["success" => true, "records" => []]);
}

$conn->close();
?>
