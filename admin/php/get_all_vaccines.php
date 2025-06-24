<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "root", "healthycainta");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit;
}

$sql = "SELECT * FROM vaccine ORDER BY VACCINE_ID DESC";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $records = [];
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
    echo json_encode(["success" => true, "records" => $records]);
} else {
    echo json_encode(["success" => true, "records" => []]);
}

$conn->close();
?>