<?php
header("Content-Type: application/json");
include("../db_connect.php"); 

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$role = $data['role'] ?? '';

if (!$email || !$password || !$role) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit;
}

if ($role === "staff") {
    $stmt = $conn->prepare("SELECT STAFF_ID, STAFF_NAME, STAFF_EMAIL, STAFF_PSWD, STAFF_ROLE FROM staff WHERE STAFF_EMAIL = ?");
} else {
    $stmt = $conn->prepare("SELECT CITIZEN_ID, CITIZEN_NAME, CITIZEN_EMAIL, CITIZEN_PSWD FROM citizen WHERE CITIZEN_EMAIL = ?");
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (
        ($role === "staff" && $password === $row['STAFF_PSWD']) ||
        ($role === "citizen" && $password === $row['CITIZEN_PSWD'])
    ) {
        if ($role === "staff") {
            echo json_encode([
                "success" => true,
                "type" => "staff",
                "id" => $row["STAFF_ID"],
                "name" => $row["STAFF_NAME"],
                "email" => $row["STAFF_EMAIL"],
                "password" => $row["STAFF_PSWD"],
                "role" => $row["STAFF_ROLE"]
            ]);
        } else {
            echo json_encode([
                "success" => true,
                "type" => "citizen",
                "id" => $row["CITIZEN_ID"],
                "name" => $row["CITIZEN_NAME"],
                "email" => $row["CITIZEN_EMAIL"],
                "password" => $row["CITIZEN_PSWD"]
            ]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found."]);
}
?>