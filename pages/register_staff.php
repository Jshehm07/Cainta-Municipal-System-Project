<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Only POST allowed"]);
    exit;
}

include("../db_connect.php"); 

$conn = mysqli_connect($host, $user, $pass, $dbname);
if (!$conn) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . mysqli_connect_error()]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid JSON input."]);
    exit;
}

$name = $data["name"] ?? '';
$email = $data["email"] ?? '';
$password = $data["password"] ?? '';
$role = $data["role"] ?? '';

if (!$name || !$email || !$password || !$role) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

$checkQuery = "SELECT * FROM staff WHERE STAFF_EMAIL = ?";
$stmt = $conn->prepare($checkQuery);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already exists."]);
    exit;
}

$query = "INSERT INTO staff (STAFF_NAME, STAFF_EMAIL, STAFF_PSWD, STAFF_ROLE) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssss", $name, $email, $password, $role);
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Staff registered successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed: " . $stmt->error]);
}
?>
