<?php
header("Content-Type: application/json");
$host = "localhost";
$user = "root";
$password = "root";
$db = "healthycainta";

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit();
}

$sql = "SELECT STAFF_ID, STAFF_ROLE, STAFF_NAME, STAFF_EMAIL, STAFF_PSWD FROM staff";
$result = $conn->query($sql);

$staff = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $staff[] = $row;
    }
    echo json_encode(["success" => true, "data" => $staff]);
} else {
    echo json_encode(["success" => true, "data" => []]);
}

$conn->close();
?>
