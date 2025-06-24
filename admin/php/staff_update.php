<?php
header("Content-Type: application/json");
$host = "localhost";
$user = "root";
$password = "root";
$db = "healthycainta";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit();
} 

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data["id"]) || 
    !isset($data["role"]) || 
    !isset($data["name"]) || 
    !isset($data["email"]) || 
    !isset($data["password"])
) {
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
    exit();
}

$id = $data["id"];
$role = $data["role"];
$name = $data["name"];
$email = $data["email"];
$password = $data["password"]; 

$stmt = $conn->prepare("UPDATE staff SET STAFF_ROLE=?, STAFF_NAME=?, STAFF_EMAIL=?, STAFF_PSWD=? WHERE STAFF_ID=?");
$stmt->bind_param("ssssi", $role, $name, $email, $password, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Staff member updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
