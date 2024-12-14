<?php
    $msg ="('status':'fail')";

require_once('../dbConnect/connect.php');
$act = isset($_POST['act'])?$_POST['act'] : "";
$act1 = isset($_POST['act1'])?$_POST['act1'] : "";
$inputStateTime1 = isset($_POST['inputStateTime1'])?$_POST['inputStateTime1'] : "";
$inputStatedate1 = isset($_POST['inputStatedate1'])?$_POST['inputStatedate1'] : "";
$Course_date_19 = isset($_POST['Course_date_19'])?$_POST['Course_date_19'] : "";
$Course_detail = isset($_POST['Course_detail'])?$_POST['Course_detail'] : "";
$inputStateTime2 = isset($_POST['inputStateTime2'])?$_POST['inputStateTime2'] : "";
$inputStatedate2 = isset($_POST['inputStatedate2'])?$_POST['inputStatedate2'] : "";
$inputStatedate = isset($_POST['inputStatedate'])?$_POST['inputStatedate'] : "";
$Course_detail1 = isset($_POST['Course_detail1'])?$_POST['Course_detail1'] : "";
$Course_namehole9 = isset($_POST['Course_namehole9'])?$_POST['Course_namehole9'] : "";
$Course_name = isset($_POST['Course_name'])?$_POST['Course_name'] : "";
$Course_id_hole9 = isset($_POST['Course_id_hole9'])?$_POST['Course_id_hole9'] : "";
$Course_id_hole18 = isset($_POST['Course_id_hole18'])?$_POST['Course_id_hole18'] : "";
$Course_id = isset($_POST['Course_id'])?$_POST['Course_id'] : "";
$number = isset($_POST['number'])?$_POST['number'] : "";
$number_count = isset($_POST['number_count'])?$_POST['number_count'] : "";


 if($act == 'golf_course'){
    $sql = 'SELECT g.*,p.price_id,p.price_name FROM `golf_course`g LEFT JOIN price p ON g.price_id = p.price_id';
    $result = $conn->query($sql);
    echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}

if($act == 'price1'){
    $sql = 'SELECT * FROM `hole_price` WHERE hole_name = "hole9"';
    $result = $conn->query($sql);
    echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}
if($act == 'price2'){
    $sql = 'SELECT * FROM `hole_price` WHERE hole_name = "hole18"';
    $result = $conn->query($sql);
    echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}

if($act == 'createhole9'){
    $sql = "INSERT INTO `golf_course`(`Course_time`, `Course_name`, `price_id`, `Course_detail`, `Course_date`,count) 
    VALUES ('$inputStateTime1','$Course_namehole9','$inputStatedate1','$Course_detail','$Course_date_19','$number_count')";
//    die($sql);
   if($conn -> query($sql)== true){
        $msg = "บันทึกรายการสำเร็จ";
    }else{
        $msg = "บันทึกรายการไม่สำเร็จ";
    }
    echo $msg;
}
if($act1 == 'createhole18'){
    $sql = "INSERT INTO `golf_course`(`Course_time`, `Course_name`, `price_id`, `Course_detail`, `Course_date`,count) 
    VALUES ('$inputStateTime2','$Course_name','$inputStatedate','$Course_detail1','$inputStatedate2','$number')";
    // die($sql);
   if($conn -> query($sql)== true){
        $msg = "บันทึกรายการสำเร็จ";
    }else{
        $msg = "บันทึกรายการไม่สำเร็จ";
    }
    echo $msg;
}
if($act1 == 'promo'){
    $promo = isset($_POST['price_pro'])?$_POST['price_pro'] : "";
    $Course_hole18 = isset($_POST['Course_hole18'])?$_POST['Course_hole18'] : "";

    $sql = "UPDATE `golf_course` SET `promotion`= '$promo' WHERE  Course_id ='$Course_hole18'";
    // die($sql);
   if($conn -> query($sql)== true){
        $msg = "บันทึกรายการสำเร็จ";
    }else{
        $msg = "บันทึกรายการไม่สำเร็จ";
    }
    echo $msg;
}


if ($act == 'delete') {
    $msg = [];
    $sql = "DELETE FROM `golf_course` WHERE  Course_id ='$Course_id'";
    
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
if($act == 'update'){
    
    $sql = "UPDATE `golf_course` SET `Course_time`='$inputStateTime1',
                                    `Course_name`='$Course_namehole9',
                                    `price_id`='$inputStatedate1',
                                    `Course_detail`='$Course_detail',
                                    `Course_date`='$Course_date_19',
                                    count = '$number_count'
                                    WHERE Course_id = '$Course_id_hole9'";
    // die($sql);
    if($conn -> query($sql)){
        $msg = "แก้ไขรายการสำเร็จ";
    }else{
        $msg = "แก้ไขรายการไม่สำเร็จ";
    }
    echo $msg;
}
if($act1 == 'update1'){
    
    $sql = "UPDATE `golf_course` SET `Course_time`='$inputStateTime2',
                                    `Course_name`='$Course_name',
                                    `price_id`='$inputStatedate',
                                    `Course_detail`='$Course_detail1',
                                    `Course_date`='$inputStatedate2',
                                    count = '$number' 
                                    WHERE Course_id = '$Course_id_hole18'";
    // die($sql);
    if($conn -> query($sql)){
        $msg = "แก้ไขรายการสำเร็จ";
    }else{
        $msg = "แก้ไขรายการไม่สำเร็จ";
    }
    echo $msg;
}
?>