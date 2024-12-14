<?php
$msg = "('status':'fail')";
require_once('../dbConnect/connect.php');

$act = isset($_POST['act']) ? $_POST['act'] : "";
$time_driving = isset($_POST['time_driving']) ? $_POST['time_driving'] : "";
$driving_date = isset($_POST['driving_date']) ? $_POST['driving_date'] : "";
$driving_number = isset($_POST['driving_number']) ? $_POST['driving_number'] : "";
$log_id = isset($_POST['log_id']) ? $_POST['log_id'] : "";
$member = isset($_POST['member']) ? $_POST['member'] : "";
$price = isset($_POST['driving_price']) ? $_POST['driving_price'] : "";

$re_picture = isset($_FILES['re_picture']) ? $_FILES['re_picture'] : "";
$conn -> autocommit(FALSE);
  
if($re_picture != ""){
    $re_picture = $_FILES['re_picture']['name'];
    if($re_picture != ""){
    $re_picture_tmp = $_FILES['re_picture']['tmp_name'];
    $ext = pathinfo($re_picture, PATHINFO_EXTENSION);
    $re_picture = uniqid().".".$ext;
    $path_img = "../img/".$re_picture;
    }
}

if ($act == 'read_log') {
    $sql = "SELECT * FROM `log_golf_driving`";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'price_golf') {
    $sql = "SELECT * FROM `hole_price` WHERE `hole_name` = 'hole18' OR `hole_name` = 'hole9'";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'price_golf_holiday') {
    $sql = "SELECT * FROM `hole_price` WHERE `hole_name` = 'hole9_holiday' OR `hole_name` = 'hole18_holiday'";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'price_golf_DriveGolf') {
    $sql = "SELECT * FROM `hole_price` WHERE `hole_name` = 'drive'";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'price_golf_caddy') {
    $sql = "SELECT * FROM `hole_price` WHERE `hole_name` = 'caddy'";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'price_golf_Cart') {
    $sql = "SELECT * FROM `hole_price` WHERE `hole_name` = 'Cart'";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'price_golf_promotion') {
    $sql = "SELECT * FROM `hole_price` WHERE `hole_name` = 'hole18_holiday'";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

if($act == 'create'){
    $id_drive = date("YmdHis");
    $state = true;
    $sql = "INSERT INTO `drive_golf`(`id_drive`, `id_log`, `date_drive`, `time_drive`, `status_id`, `reserve_by`,`img_drive`,`price_drive`)
    VALUES ('$id_drive', '$log_id', '$driving_date', '$time_driving', '11', '$member','$re_picture','$price')";
    // die($sql);
    if($conn -> query($sql)){
        $sql = "UPDATE `log_golf_driving` SET `status_id`='7' WHERE `id`='$log_id'";
                if($conn -> query($sql)){
                if($re_picture != ""){
                    if(!move_uploaded_file($re_picture_tmp, $path_img)) $state = false;
                }
            }
        if($state) $conn->commit();
    }else{
        
    }

    if($conn->error || !$state) {
        echo json_encode(array("status" => false, "msg" => "เพิ่มข้อมูลไม่สำเร็จ"));
    }else {
        echo json_encode(array("status" => true, "msg" => "เพิ่มข้อมูลสำเร็จ"));
    }
    echo $msg;
}

// if($act == 'create'){
//     $id_drive = date("YmdHis");
//     $state = true;
//     $current_date = date("Y-m-d");
//     $sql = "INSERT INTO `drive_golf`(`id_drive`, `id_log`, `date_drive`, `time_drive`, `status_id`, `reserve_by`,`img_drive`,`price_drive`)
//     VALUES ('$id_drive', '$log_id', '$driving_date', '$time_driving', '11', '$member','$re_picture','$price')";
//     die($sql);
//     if($conn->query($sql)){
//         // Check if the booking date is today or in the future
//         if ($driving_date == $current_date) {
//             $new_status = '7'; // Status for bookings on the current date
//         } else {
//             $new_status = '6'; // Example status for future bookings, you can change this as needed
//         }

//         $sql = "UPDATE `log_golf_driving` SET `status_id`='$new_status' WHERE `id`='$log_id'";
//         if($conn->query($sql)){
//             if($re_picture != ""){
//                 if(!move_uploaded_file($re_picture_tmp, $path_img)) $state = false;
//             }
//         }

//         if($state) $conn->commit();
//     }else{
//         $state = false;
//     }

//     if($conn->error || !$state) {
//         echo json_encode(array("status" => false, "msg" => "เพิ่มข้อมูลไม่สำเร็จ"));
//     }else {
//         echo json_encode(array("status" => true, "msg" => "เพิ่มข้อมูลสำเร็จ"));
//     }
// }

?>