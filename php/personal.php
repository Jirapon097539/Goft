<?php
    $msg ="('status':'fail')";
    require_once('../dbConnect/connect.php');

    $act = isset($_POST['act'])?$_POST['act'] : "";
    $Level_id = isset($_POST['Level_id'])?$_POST['Level_id'] : "";
    $Level_name = isset($_POST['Level_name'])?$_POST['Level_name'] : "";
    $Level_surname = isset($_POST['Level_surname'])?$_POST['Level_surname'] : "";
    $Level_tel = isset($_POST['Level_tel'])?$_POST['Level_tel'] : "";
    $Level_user = isset($_POST['Level_user'])?$_POST['Level_user'] : "";
    $Level_password = isset($_POST['Level_password'])?$_POST['Level_password'] : "";
    $position_id = isset($_POST['position_id'])?$_POST['position_id'] : "";
    $Level_picture = isset($_FILES['Level_picture']) ? $_FILES['Level_picture'] : "";
    
    if($Level_picture != ""){
        $Level_picture = $_FILES['Level_picture']['name'];
        if($Level_picture != ""){
        $Level_picture_tmp = $_FILES['Level_picture']['tmp_name'];
        $ext = pathinfo($Level_picture, PATHINFO_EXTENSION);
        $Level_picture = uniqid().".".$ext;
        $path_img = "../img/".$Level_picture;
        }
        // die($Level_picture );
    }
    
    if($act == 'create'){
        $conn->autocommit(false);
        $state = true;
        $sql = "INSERT INTO `level`(`Level_id`, `Level_name`, `Level_surname`, `Level_tel`, `Level_user`, `Level_password`, `position_id`, `Level_picture`) 
        VALUES ('$Level_id','$Level_name','$Level_surname','$Level_tel','$Level_user','$Level_password','$position_id','$Level_picture')";
        // die($sql);
        if($conn -> query($sql)){
            if($Level_picture != ""){
                if(!move_uploaded_file($Level_picture_tmp, $path_img)) $state = false;
            }

            if($state) $conn->commit();
        }else{
            
        }

        if($conn->error || !$state) {
            echo json_encode(array("status" => false, "msg" => "เพิ่มข้อมูลไม่สำเร็จ"));
        }else {
            echo json_encode(array("status" => true, "msg" => "เพิ่มข้อมูลสำเร็จ"));
        }
        // echo $msg;
    }
    if($act == 'read'){
        $sql = 'SELECT s.*, p.position_id,p.position_name FROM `level` s LEFT JOIN position p ON s.position_id = p.position_id ';
        $result = $conn->query($sql);
        echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
    }
    if($act == 'position'){
        $sql = 'SELECT * FROM `position`';
        $result = $conn->query($sql);
        echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
    }
    if($act == 'update'){
        $conn->autocommit(false);
        $state = true;
        // $msg = [];
        $sql = "UPDATE `level` SET
        `Level_name`='$Level_name',
        `Level_surname`='$Level_surname',
        `Level_tel`='$Level_tel',
        `Level_user`='$Level_user',
        `position_id`='$position_id'";
        if($Level_picture != "") $sql .= ",`Level_picture`='$Level_picture' ";
        $sql .= " WHERE Level_id ='$Level_id'";
        
        // die($sql);
        if($conn -> query($sql)){
            if($Level_picture != ""){
                if(!move_uploaded_file($Level_picture_tmp, $path_img)) $state = false;
            }

            if($state) $conn->commit();
        }else{
            
        }

        if($conn->error || !$state) {
            echo json_encode(array("status" => false, "msg" => "แก้ไขรายการไม่สำเร็จ"));
        }else {
            echo json_encode(array("status" => true, "msg" => "แก้ไขรายการสำเร็จ"));
        }
        // echo $msg;
    }
   


    if ($act == 'delete') {
        $msg = [];
        $sql = "DELETE FROM `level` WHERE  Level_id ='$Level_id'";
        
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