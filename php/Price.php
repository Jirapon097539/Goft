<?php
 $msg ="('status':'fail')";
 require_once('../dbConnect/connect.php');

 $act = isset($_POST['act'])?$_POST['act'] : "";
 $price_id = isset($_POST['price_id'])?$_POST['price_id'] : "";
 $price_name = isset($_POST['price_name'])?$_POST['price_name'] : "";

if($act == 'create'){
    $sql = "INSERT INTO `price`(`price_name`) VALUES ('$price_name')";
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
    $sql = 'SELECT * FROM `price` ';
    $result = $conn->query($sql);
    echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}
if($act == 'update'){
    $sql = "UPDATE `price` SET `price_name`='$price_name' WHERE price_id = '$price_id'";
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
    $check_sql = "SELECT * FROM `golf_course` WHERE price_id = '$price_id'";
    $check_result = $conn->query($check_sql);
    if ($check_result->num_rows > 0) {
        $msg['status'] = false;
        $msg['msg'] = "ไม่สามารถลบข้อมูลได้เนื่องจากมีการใช้งาน ID นี้อยู่ในตารางอื่น";
    } else {
        $sql = "DELETE FROM `price` WHERE price_id ='$price_id'";
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