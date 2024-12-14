<?php
session_start();
require_once('../dbConnect/connect.php'); 

$act = isset($_POST['act']) ? $_POST['act'] : "";
$Member_identification = isset($_POST['pinId']) ? $_POST['pinId'] : "";

if ($act == "update_foget") {
    if (empty($Member_identification)) {
        echo json_encode(array("status" => false, "msg" => "กรุณากรอกอีเมล"));
        exit; 
    }
    $stmt = $conn->prepare("SELECT * FROM member WHERE Member_email = ?");
    $stmt->bind_param("s", $Member_identification);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        // Check if email has been sent
        if (isset($_SESSION['email_sent']) && $_SESSION['email_sent'] === true) {
            echo json_encode(array("status" => false, "msg" => "อีเมลถูกส่งไปแล้ว กรุณาตรวจสอบอีเมลของคุณ!!"));
            exit;
        }

        $new_password = generateRandomPassword(); 
        $hashed_password = hash('sha256', $new_password); 

        $stmt_update = $conn->prepare("UPDATE member SET Member_password = ? WHERE Member_email = ?");
        $stmt_update->bind_param("ss", $hashed_password, $Member_identification);

        if ($stmt_update->execute()) {
            $to = $Member_identification;
            $subject = 'รหัสผ่านใหม่ของคุณ';
            $message = 'สวัสดีคุณ,<br><br> รหัสผ่านใหม่ของคุณคือ: ' . $new_password . '<br><br> กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่นี้ และแก้ไขรหัสผ่านทันทีหลังจากเข้าสู่ระบบ.';
            $headers = "From: your_email@example.com\r\n";
            $headers .= "Content-type: text/html\r\n";

            // Send email
            if (mail($to, $subject, $message, $headers)) {
                echo json_encode(array("status" => true, "msg" => "สร้างรหัสผ่านใหม่และส่งไปยังอีเมลของสมาชิกแล้ว"));
                // Set session that email has been sent
                $_SESSION['email_sent'] = true;
            } else {
                echo json_encode(array("status" => false, "msg" => "เกิดข้อผิดพลาดในการส่งอีเมล"));
                exit; 
            }
        } else {
            echo json_encode(array("status" => false, "msg" => "เกิดข้อผิดพลาดในการแก้ไขข้อมูล"));
            exit;
        }

        // Close prepared statement
        $stmt_update->close();
    } else {
        echo json_encode(array("status" => false, "msg" => "ไม่พบสมาชิกที่มีอีเมลนี้"));
        exit; 
    }

    // Close prepared statement and database connection
    $stmt->close();
    $conn->close();
}

// Function to generate a random password
function generateRandomPassword($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}
?>
