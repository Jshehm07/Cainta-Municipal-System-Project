<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "root", "healthycainta");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit;
}

$result = $conn->query("SELECT * FROM citizen");
$citizens = [];

while ($row = $result->fetch_assoc()) {
    $citizens[] = $row;
}

echo json_encode(["success" => true, "data" => $citizens]);
$conn->close();
?>
