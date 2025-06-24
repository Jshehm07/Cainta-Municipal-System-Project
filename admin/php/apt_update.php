<?php
header("Content-Type: application/json");
include '../../db_connect.php'; 

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['APT_ID'])) {
    echo json_encode(["success" => false, "message" => "Invalid data."]);
    exit;
}

$id = intval($data['APT_ID']);
$name = $conn->real_escape_string($data['APT_NAME']);
$appointee = $conn->real_escape_string($data['APT_APPOINTEE']);
$phone = $conn->real_escape_string($data['APT_PHONE']);
$id_type = $conn->real_escape_string($data['APT_IDENTIFICATION']);
$specifics = $conn->real_escape_string($data['APT_SPECIFICS']);
$date = $conn->real_escape_string($data['APT_DATE']);
$time = $conn->real_escape_string($data['APT_TIME']);

$sql = "UPDATE appointment SET 
    APT_NAME = '$name',
    APT_APPOINTEE = '$appointee',
    APT_PHONE = '$phone',
    APT_IDENTIFICATION = '$id_type',
    APT_SPECIFICS = '$specifics',
    APT_DATE = '$date',
    APT_TIME = '$time'
    WHERE APT_ID = $id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}
?>
