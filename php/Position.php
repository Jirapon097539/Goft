<?php
 $msg ="('status':'fail')";
 require_once('../dbConnect/connect.php');

 $act = isset($_POST['act'])?$_POST['act'] : "";
 $position_id = isset($_POST['position_id'])?$_POST['position_id'] : "";
 $position_name = isset($_POST['position_name'])?$_POST['position_name'] : "";


if($act == 'create'){
    $sql = "INSERT INTO `position`(`position_id`, `position_name`) VALUES ('$position_id','$position_name')";
    // die($sql);
    if($conn -> query($sql)){
        $msg = "เพิ่มรายการสำเร็จ";
    }else{
        $msg = "เพิ่มรายการไม่สำเร็จ";
    }
    echo $msg;
}
if($act == 'read'){
    $sql = 'SELECT * FROM `position`';
    $result = $conn->query($sql);
    echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}
if($act == 'update'){
    $sql = "UPDATE `position` SET `position_name`='$position_name' WHERE position_id = '$position_id'";
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
    
    // ตรวจสอบว่ามีการใช้งาน ID ในตาราง `level` หรือไม่
    $check_sql1 = "SELECT * FROM `level` WHERE position_id = '$position_id'";
    $check_result1 = $conn->query($check_sql1);
    
    // ตรวจสอบว่ามีการใช้งาน ID ในตาราง `another_table` หรือไม่
    $check_sql2 = "SELECT * FROM `member` WHERE user_level = '$position_id'";
    $check_result2 = $conn->query($check_sql2);
    
    if ($check_result1->num_rows > 0 || $check_result2->num_rows > 0) {
        $msg['status'] = false;
        $msg['msg'] = "ไม่สามารถลบข้อมูลได้เนื่องจากมีการใช้งาน ID นี้อยู่ในตารางอื่น";
    } else {
        $sql = "DELETE FROM `position` WHERE position_id = '$position_id'";
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