<?php
 $msg ="('status':'fail')";
 require_once('../dbConnect/connect.php');

 $act = isset($_POST['act'])?$_POST['act'] : "";
 $status_id = isset($_POST['status_id'])?$_POST['status_id'] : "";
 $status_name = isset($_POST['status_name'])?$_POST['status_name'] : "";


if($act == 'create'){
    $sql = "INSERT INTO `status`(`status_id`, `status_name`) VALUES ('$status_id','$status_name')";
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
    $sql = 'SELECT * FROM `status`';
    $result = $conn->query($sql);
    echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}
if($act == 'update'){
    $sql = "UPDATE `status` SET `status_name`='$status_name' WHERE status_id = '$status_id'";
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
    $sql = "DELETE FROM `status` WHERE status_id ='$status_id'";
    
    try {
        if ($conn->query($sql)) {
            $msg['status'] = true;
            $msg['msg'] = "ลบข้อมูลสำเร็จ";
        } else {
            $msg['status'] = false;
            $msg['msg'] = "ลบข้อมูลไม่สำเร็จ: Unknown error occurred";
        }
    } catch (mysqli_sql_exception $e) {
        // Capture the SQL error
        $error = $e->getMessage();

        // Check if the error is related to foreign key constraint
        if (strpos($error, 'foreign key constraint') !== false) {
            $msg['status'] = false;
            $msg['msg'] = "ลบข้อมูลไม่สำเร็จ: มีการใช้งานข้อมูลนี้อยู่ที่อื่น";
        } else {
            $msg['status'] = false;
            $msg['msg'] = "ลบข้อมูลไม่สำเร็จ: $error";
        }
    }

    echo json_encode($msg);
}


?>