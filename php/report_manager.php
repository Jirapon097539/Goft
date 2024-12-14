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
    $sql = "SELECT b.*, s.status_id, s.status_name, g.*, m.* FROM book b LEFT JOIN status s ON b.status_id = s.status_id LEFT JOIN golf_course g ON b.Book_time = g.Course_id LEFT JOIN member m ON b.Member_id = m.Member_id WHERE b.status_id = '5' ORDER BY b.Book_date DESC";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'read_drive') {
    $sql = "SELECT d.*,s.status_id,s.status_name,l.id, l.log_name,m.* FROM `drive_golf` d LEFT JOIN status s ON d.status_id = s.status_id  LEFT JOIN log_golf_driving l ON d.id_log = l.id LEFT JOIN member m ON d.reserve_by = m.Member_id WHERE  d.status_id = '16'";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
?>