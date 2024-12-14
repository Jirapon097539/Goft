<?php
 $msg ="('status':'fail')";
 require_once('../dbConnect/connect.php');

 $act = isset($_POST['act'])?$_POST['act'] : "";
 $id = isset($_POST['id'])?$_POST['id'] : "";
 $log_name = isset($_POST['log_name'])?$_POST['log_name'] : "";

if($act == 'create'){
    $sql = "INSERT INTO `log_golf_driving`(`id`, `log_name`,status_id) VALUES ('$id','$log_name','6')";
    // die($sql);
    if($conn -> query($sql)){
        $msg = "เพิ่มรายการสำเร็จ";
    }else{
        $msg = "เพิ่มรายการไม่สำเร็จ";
    }
    echo $msg;
    // echo $msg;
}
if($act == 'read'){
    $sql = 'SELECT * FROM `log_golf_driving`';
    $result = $conn->query($sql);
    echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}
if($act == 'update'){
    $sql = "UPDATE `log_golf_driving` SET `log_name`='$log_name' WHERE id = '$id'";
    // die($sql);
    if($conn -> query($sql)){
        $msg = "แก้ไขรายการสำเร็จ";
    }else{
        $msg = "แก้ไขรายการไม่สำเร็จ";
    }
    echo $msg;
}


if ($act == 'delete') {
    $msg = [];
    // เพิ่มโค้ด SQL สำหรับตรวจสอบว่า ID ถูกใช้งานหรือไม่
    $check_sql = "SELECT * FROM `drive_golf` WHERE id_log ='$id'";
    $check_result = $conn->query($check_sql);
    if ($check_result->num_rows > 0) {
        $msg['status'] = false;
        $msg['msg'] = "ไม่สามารถลบข้อมูลได้เนื่องจากมีการใช้งาน ID นี้อยู่ในตารางอื่น";
    } else {
        $sql = "DELETE FROM `log_golf_driving` WHERE id ='$id'";
        if ($conn->query($sql)) {
            $msg['status'] = true;
            $msg['msg'] = "ลบข้อมูลสำเร็จ";
        } else {
            $msg['status'] = false;
            $msg['msg'] = "ลบข้อมูลไม่สำเร็จ";
        }
    }
    echo json_encode($msg);
}
?>