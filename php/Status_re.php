<?php

$msg = "('status':'fail')";
require_once('../dbConnect/connect.php');
$act = isset($_POST['act']) ? $_POST['act'] : "";
$member = isset($_POST['member']) ? $_POST['member'] : "";
$Book_id_detail = isset($_POST['Book_id_detail']) ? $_POST['Book_id_detail'] : "";
$Book_id = isset($_POST['Book_id']) ? $_POST['Book_id'] : "";
$id_drive = isset($_POST['id_drive']) ? $_POST['id_drive'] : "";
$id_log = isset($_POST['id_log']) ? $_POST['id_log'] : "";

if ($act == 'read') {
    $sql = "SELECT b.*,s.status_id,s.status_name,g.* FROM `book` b LEFT JOIN status s ON b.status_id = s.status_id LEFT JOIN golf_course g ON b.Book_time = g.Course_id  WHERE Member_id = '$member' ";
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'read_drive') {
    $sql = "SELECT d.*,s.status_id,s.status_name,l.id, l.log_name FROM `drive_golf` d LEFT JOIN status s ON d.status_id = s.status_id  LEFT JOIN log_golf_driving l ON d.id_log = l.id WHERE reserve_by = '$member' ";
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

?>