<?php
require_once('../dbConnect/connect.php');

$act = isset($_POST['act'])?$_POST['act'] : "";
$status = isset($_POST['status_id'])?$_POST['status_id'] : "";
$Member_identification = isset($_POST['Member_identification'])?$_POST['Member_identification'] : "";
$id = isset($_POST['id'])?$_POST['id'] : "";


if($act == 'read_member'){
    $sql = 'SELECT m.*, n.nationnality_id,n.nationnality_name FROM `member`m  LEFT JOIN nationnality n ON n.nationnality_id = m.nationnality_id;';
    $result = $conn->query($sql);
    echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}
// if($act == 'status'){
//     $sql = 'SELECT * FROM `status`';
//     $result = $conn->query($sql);
//     echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
// }

if($act == 'update'){

    // $msg = [];
    $sql = "UPDATE `member` SET `status`='$status' WHERE Member_id = '$id'";
    // die($sql);
    if($conn -> query($sql)){
        $msg = "แก้ไขรายการสำเร็จ";
    }else{
        $msg = "แก้ไขรายการไม่สำเร็จ";
    }
    echo $msg;

}
?>