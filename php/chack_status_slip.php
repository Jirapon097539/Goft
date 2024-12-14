<?php

$msg = "('status':'fail')";
require_once('../dbConnect/connect.php');
$act = isset($_POST['act']) ? $_POST['act'] : "";
$member = isset($_POST['member']) ? $_POST['member'] : "";
$Member_id = isset($_POST['Member_id']) ? $_POST['Member_id'] : "";
$Book_id_detail = isset($_POST['Book_id_detail']) ? $_POST['Book_id_detail'] : "";
$Book_id = isset($_POST['Book_id']) ? $_POST['Book_id'] : "";
$bookId = isset($_POST['bookId']) ? $_POST['bookId'] : "";
$id_drive = isset($_POST['id_drive']) ? $_POST['id_drive'] : "";
$id_log = isset($_POST['id_log']) ? $_POST['id_log'] : "";
$cancelReason = isset($_POST['cancelReason']) ? $_POST['cancelReason'] : "";
$cencel_by = isset($_POST['cencel_by']) ? $_POST['cencel_by'] : "";

if ($act == 'read') {
    $sql = "SELECT b.*, s.status_id, s.status_name, g.*, m.* FROM book b LEFT JOIN status s ON b.status_id = s.status_id LEFT JOIN golf_course g ON b.Book_time = g.Course_id LEFT JOIN member m ON b.Member_id = m.Member_id WHERE b.status_id = '3' ORDER BY b.Book_date DESC";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'read_drive') {
    $sql = "SELECT d.*,s.status_id,s.status_name,l.id, l.log_name,m.* FROM `drive_golf` d LEFT JOIN status s ON d.status_id = s.status_id  LEFT JOIN log_golf_driving l ON d.id_log = l.id LEFT JOIN member m ON d.reserve_by = m.Member_id WHERE  d.status_id = '11'";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'read_detail_caddy') {
    $sql = "SELECT b.*,c.* FROM `detail_book` b LEFT JOIN caddy c ON b.Caddy_number = c.Caddy_number   WHERE Book_id = '$Book_id_detail' ";
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}



if ($act == 'delete') {
    $msg = [];

    $conn->begin_transaction();

    $sql = "DELETE FROM `detail_book` WHERE `Book_id` = '$Book_id'";
    if ($conn->query($sql)) {
        $sql = "DELETE FROM `book` WHERE `Book_id` = '$Book_id'";
        if ($conn->query($sql)) {
            if ($conn->commit()) {
                $msg['status'] = true;
                $msg['msg'] = "ลบข้อมูลสำเร็จ";
            } else {
                $conn->rollback(); 
                $msg['status'] = false;
                $msg['msg'] = "ไม่สามารถบันทึกการเปลี่ยนแปลงได้";
            }
        } else {
            $conn->rollback(); 
            $msg['status'] = false;
            $msg['msg'] = "ลบข้อมูลไม่สำเร็จ";
        }
    } else {
        $conn->rollback(); // Rollback if deletion from `detail_book` fails
        $msg['status'] = false;
        $msg['msg'] = "ลบข้อมูลไม่สำเร็จ";
    }

    echo json_encode($msg);
}
if ($act == 'delete_drive') {
    $msg = [];

    $conn->begin_transaction();

    $sql = "DELETE FROM `drive_golf` WHERE `id_drive` = '$id_drive'";
    if ($conn->query($sql)) {
        $sql = "UPDATE `log_golf_driving` SET `status_id`='6' WHERE `id` = '$id_log'";
        if ($conn->query($sql)) {
            if ($conn->commit()) {
                $msg['status'] = true;
                $msg['msg'] = "ลบข้อมูลสำเร็จ";
            } else {
                $conn->rollback(); 
                $msg['status'] = false;
                $msg['msg'] = "ไม่สามารถบันทึกการเปลี่ยนแปลงได้";
            }
        } else {
            $conn->rollback(); 
            $msg['status'] = false;
            $msg['msg'] = "ลบข้อมูลไม่สำเร็จ";
        }
    } else {
        $conn->rollback(); // Rollback if deletion from `detail_book` fails
        $msg['status'] = false;
        $msg['msg'] = "ลบข้อมูลไม่สำเร็จ";
    }

    echo json_encode($msg);
}


if($act == 'update_end'){
    $sql = "UPDATE `book` SET `status_id`= '5' WHERE Book_id = '$bookId' ";
    // die($sql);
    if($conn -> query($sql)){
        $msg = "รายการสำเร็จ";
    }else{
        $msg = "รายการไม่สำเร็จ";
    }
    echo $msg;
}


if($act == 'pay_drive'){
    $sql = "UPDATE `drive_golf` SET `status_id`= '5' WHERE id_drive = '$id_drive' ";
    // die($sql);
    if($conn -> query($sql)){
        $msg = "รายการสำเร็จ";
    }else{
        $msg = "รายการไม่สำเร็จ";
    }
    echo $msg;
}


if ($act == "sendEmail") {
    $id_drive = isset($_POST['id_drive']) ? $_POST['id_drive'] : "";
    
    $sql = "SELECT d.*,s.status_id,s.status_name,l.id, l.log_name,m.* FROM `drive_golf` d LEFT JOIN status s ON d.status_id = s.status_id  LEFT JOIN log_golf_driving l ON d.id_log = l.id LEFT JOIN member m ON d.reserve_by = m.Member_id WHERE d.id_drive = '$id_drive'";
    // die($sql);
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $data = $result->fetch_all(MYSQLI_ASSOC);
        
        $status = true; // assume all emails will be sent successfully
        foreach ($data as $row) {
            if (!sendEmail($row['Member_id'], $row['Member_email'], $row['time_drive'], $row['date_drive'], $row['Member_firstname'], $row['Member_lastname'])) {
                $status = false; // if any email fails to send, set status to false
                break; // no need to continue sending emails if one fails
            }
        }
        echo json_encode(["status" => $status]);
        
    } else {
        echo json_encode(["status" => false]);
    }
}

function sendEmail($user, $email,$time_drive,$date_drive,$Member_firstname,$Member_lastname) {
    $subject = 'KABIN BURI SPORT CLUB (KBSC)';
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: <sender@example.com>' . "\r\n";
    $headers .= 'Reply-To: <sender@example.com>' . "\r\n";
    $message = '
<html>
<head>
    <title>แจ้งเตือนกำหนดการวันออกรอบ</title>
</head>
<body>
    <div style="width: 100%;display:flex;justify-content: center;">
        <div style="border: 1px solid #c4c7c5;border-radius: 10px;padding: 10px 20px; width: 50%;">
            <p style="font-size: 20px;width: 100%;text-align:center;">แจ้งเตือนกำหนดการวันออกรอบในวันที่' . $date_drive . '</p>
            <hr style="width: 100%;">
            <p style="font-size: 25px; width: 100%;text-align: center;">user : ' . $user . '</p>
            <p style="font-size: 25px; width: 100%;text-align: center;">email : ' . $email . '</p>
            <p style="font-size: 25px; width: 100%;text-align: center;">ชื่อผู้ใช้งาน : ' . $Member_firstname .' ' . $Member_lastname .'</p>
            <p style="font-size: 25px; width: 100%;text-align: center;">เวลาที่จองออกรอบ : ' . $time_drive . '</p>
            <p style="font-size: 25px; width: 100%;text-align: center;">วันที่จอง : ' . $date_drive . '</p>
            <p style="font-size: 15px;">ถ้ามีปัญหาหรือไม่สะดวก กรุณาแจ้งที่ 0839076635   </p>
        </div>
    </div>
</body>
</html>
';
    return mail($email, $subject, $message, $headers);
}

?>