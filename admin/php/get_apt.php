<?php
header('Content-Type: application/json');
include '../../db_connect.php'; 

if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "No ID provided."]);
    exit;
}

$id = intval($_GET['id']);
$sql = "SELECT * FROM appointment WHERE APT_ID = $id";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo json_encode(["success" => true, "data" => $result->fetch_assoc()]);
} else {
    echo json_encode(["success" => false, "message" => "Appointment not found."]);
}
?>
